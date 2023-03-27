import argparse
import requests
from bs4 import BeautifulSoup

def get_top_movies(year):
    url = f'https://www.boxofficemojo.com/year/{year}/'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    movies = []
    table = soup.find('table', {'class': 'a-bordered'})
    rows = table.find_all('tr')
    for row in rows[1:11]:
        title = row.find('td', {'class': 'a-text-left'}).text.strip()
        gross = row.find_all('td')[3].text.strip()
        movies.append((title, gross))

    return movies

parser = argparse.ArgumentParser(description='Get top 10 movies based on box office earnings for a given year.')
parser.add_argument('year', type=int, help='the year to get top movies for')

args = parser.parse_args()

year = args.year
movies = get_top_movies(year)

print(f"\nTop 10 movies of {year} based on box office earnings:")
for i, movie in enumerate(movies):
    print(f"{i+1}. {movie[0]} - {movie[1]}")

