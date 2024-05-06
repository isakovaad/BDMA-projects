from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from airflow.contrib.sensors.file_sensor import FileSensor
from airflow.operators.bash_operator import BashOperator
import os
import re

default_args = {
    'owner': 'airflow',
    'start_date': datetime(2023, 11, 16),
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

data_folder_path = '/home/louaibouzaher/airflow/data/'
log_file = os.path.join(data_folder_path, 'the_logs/log.txt')
extracted_file = os.path.join(data_folder_path, 'extracted_data.txt')
transformed_file = output_file = os.path.join(data_folder_path, 'transformed_data.txt')
archived_file = output_file = os.path.join(data_folder_path, 'weblog.tar')



def extract_data():
  ip_pattern = r"\b(?:\d{1,3}\.){3}\d{1,3}\b"
  with open(log_file, 'r') as file:
    log_data = file.read()
    
  ip_addresses = re.findall(ip_pattern, log_data)
  with open(extracted_file, 'w') as file:
    for ip in ip_addresses:
        file.write(ip + '\n')



def transform_data():
  eliminated_values = ['198.46.149.143']

  with open(extracted_file, 'r') as infile:
      lines = infile.readlines()

  filtered_lines = [line.strip() for line in lines if not any(value in line for value in eliminated_values)]

  with open(transformed_file, 'w') as outfile:
      outfile.write('\n'.join(filtered_lines))


with DAG('process_web_log',
         default_args=default_args,
         schedule="@daily"
        ) as dag:

    scan_for_log_task = FileSensor(
        task_id="scan_for_log",
        filepath=log_file,
    )

    extract_data_task = PythonOperator(
        task_id='extract_data',
        python_callable=extract_data
    )

    transform_data_task = PythonOperator(
        task_id='transform_data',
        python_callable=transform_data
    )

    load_data_task =  BashOperator(
    task_id='load_data',
    bash_command='tar -cf {} {}'.format(archived_file, transformed_file)
    )
    
    scan_for_log_task >> extract_data_task >> transform_data_task >> load_data_task