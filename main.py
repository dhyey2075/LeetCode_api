import requests
from bs4 import BeautifulSoup

url = "https://takeuforward.org/data-structure/n-meetings-in-one-room/"
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

# Extract the title
print(soup)
# Extract
