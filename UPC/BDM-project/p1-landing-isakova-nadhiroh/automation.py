"""
pip3 install webdriver_manager
pip3 install selenium
pip3 install pymongo
"""

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
from pymongo import MongoClient

import time

# Setup Chrome WebDriver using webdriver_manager to handle driver setup
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)

def login(email, password):
    driver.get("https://www.meetup.com/login")

    time.sleep(5)

    email_input = driver.find_element(By.ID, "email")
    email_input.send_keys(email)

    password_input = driver.find_element(By.ID, "current-password")
    password_input.send_keys(password)

    submit_button = driver.find_element(By.XPATH, "//button[@data-testid='submit']")
    submit_button.click()

def scraping_events(page):
    event_links = []

    target_url = "https://www.meetup.com/find/?suggested=true&source=EVENTS&location=es--Barcelona"
    driver.get(target_url)

    time.sleep(5)

    for x in range(page):
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(5)

    soup = BeautifulSoup(driver.page_source, "html.parser")
    a_tags = soup.find_all('a')

    for tag in a_tags:
        href = tag.get('href')
        if "/events/" in href and href not in event_links:
            event_links.append(href)

    return event_links

def get_information(links):
    datas = []
    failed_link = []

    for link in links:
        try:
            driver.get(link)

            time.sleep(5)

            soup = BeautifulSoup(driver.page_source, "html.parser")
            title = soup.find('h1').text
            hosted_by = soup.find('span').text 
            event_time = soup.find('time').text

            a_tag = soup.find('a', {'data-testid': 'venue-name-link'})
            gmaps_link = a_tag['href'] if a_tag else None
            vanue_location = a_tag.text.strip() if a_tag else None
            vanue_location_detail = soup.find('div', {'data-testid': 'location-info'}).text.strip()
            description = soup.find('div', class_='break-words').get_text(separator=' ', strip=True)
            sections = soup.find_all('section', id='topics')

            for section in sections:
                abc = section.get_text(separator='\n', strip=True)
            
            topics = abc.split('\n')
            
            data = {
                'title': title,
                'hosted_by': hosted_by,
                'event_time': event_time,
                'gmaps_link': gmaps_link,
                'vanue_location': vanue_location,
                'vanue_location_detail': vanue_location_detail,
                'description': description,
                'topics': topics
            }

            datas.append(data)

            print(f"{link} managed to scrape \n")
        except:
            failed_link.append(link)
            continue

    return datas, failed_link

def insert_data(datas):
    # Connect to MongoDB - assumes MongoDB is running on localhost and default port 27017
    client = MongoClient(host='localhost', port=27017)

    # Select the database - 'mydatabase' (this will create the database if it doesn't exist)
    db = client['meetup']

    # Select the collection - 'mycollection' (this will create the collection if it doesn't exist)
    collection = db['data']

    # Insert the data into the collection
    collection.insert_many(datas)

email = "data.analyst.mentorship@gmail.com"
password = "Testong@123"
location = "Barcelona, ES"
page = 5

# Login process
login(email, password)

# Wait for a few seconds to visually confirm the result
time.sleep(5)

# Scraping event
links = scraping_events(page)

# for testing
# links = links[:5]

# Get information from web page
datas, failed_link = get_information(links)

insert_data(datas)

print("Done")
print(f"There are {len(failed_link)} failed to scrape. Here's the link : \n")
for fLink in failed_link:
    print(fLink)

time.sleep(5)

# Close the browser window
driver.quit()