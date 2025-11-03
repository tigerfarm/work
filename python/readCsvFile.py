import csv
import os
with open('readCsvFile.csv') as csvfile:
    thereader = csv.reader(csvfile, delimiter=',', quotechar='|')
    for row in thereader:
        fromthis = row[0]
        tothat = row[1]
        print("+ fromthis: " + fromthis + ", tothat: " + tothat)