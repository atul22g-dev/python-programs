import os
import pandas as pd

# Get the list of all files in the folder
folder_path = 'xlsx'
file_list = os.listdir(folder_path)

# Specify the folder to save the .csv files
output_folder = 'csv'

# Filter the list to only include .xlsx files
xlsx_files = [file for file in file_list if file.endswith('.xlsx')]

# Convert each .xlsx file to .csv and save in the output folder
for file in xlsx_files:
    try:
        # Read the .xlsx file
        df = pd.read_excel(os.path.join(folder_path, file))
        
        # Convert and save as .csv in the output folder
        csv_file = file.replace('.xlsx', '.csv')
        df.to_csv(os.path.join(output_folder, csv_file), index=False)
    except Exception as e:
        print(f"Error converting {file} to csv: {e}")
