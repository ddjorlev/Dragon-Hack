import requests
from bs4 import BeautifulSoup

def scrape_kulturnik_events():
    url = 'https://dogodki.kulturnik.si/'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    events = []
    
    event_cards = soup.find_all('div', class_='event-card')
    
    for card in event_cards:
        title = card.find('h3', class_='title').text.strip()
        location = card.find('div', class_='location').text.strip()
        date = card.find('div', class_='date').text.strip()
        time = card.find('div', class_='time').text.strip()
        description = card.find('div', class_='description').text.strip()
        
        event = {
            'title': title,
            'location': location,
            'date': date,
            'time': time,
            'description': description
        }
        
        events.append(event)
    
    return events

if __name__ == '__main__':
    kulturnik_events = scrape_kulturnik_events()
    for event in kulturnik_events:
        print(event)
