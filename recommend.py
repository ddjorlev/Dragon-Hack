from ret_data import ret_data
from sklearn.cluster import KMeans
import numpy as np

def train_clustering_model(data):
    ratings = []
    for entry in data:
        one_entry = []
        for rating in entry[2]:
            one_entry.append(rating)
        ratings.append(one_entry)

    # Fit KMeans clustering model
    kmeans = KMeans(n_clusters=1, random_state=42)

    kmeans.fit(ratings)

    return kmeans

def recommend(choice, activity, day):
    data = ret_data()
    filtered_data = [entry for entry in data if entry[1] == day or entry[1] == ""]
    
    new_data = []
    if activity == 0:
        for entry in filtered_data:
            if entry[2][0] >= 5:
                new_data.append(entry)

    elif activity == 1:
        for entry in filtered_data:
            if entry[2][0] <= 5:
                new_data.append(entry)

  
    # Train clustering model for the chosen activity
    new_data = np.array(new_data)
    clustering_model = train_clustering_model(new_data)

    ratings = [entry[2] for entry in new_data]
    # print(ratings)
    cluster_labels = clustering_model.predict(ratings)
    chosen_cluster = clustering_model.predict([choice])[0]

    events_in_chosen_cluster = [new_data[i] for i, label in enumerate(cluster_labels) if label == chosen_cluster]
    best_event = max(events_in_chosen_cluster, key=lambda x: max(x[2]))

    return best_event[0]

# choice = [2,3,0,1,2,1]
# activity = 0
# day = "21.4.2024"
# print(recommend(choice, activity, day))