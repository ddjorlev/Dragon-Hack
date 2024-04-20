from ret_data import ret_data
from sklearn.cluster import KMeans
import numpy as np

def train_clustering_model(data):
    # print(data)
    ratings = []
    for entry in data:
        # print(entry)
        for rating in entry[2]:
            ratings.append(rating)
    #ratings = [rating for entry in data for rating in entry[2]]

    # Fit KMeans clustering model
    kmeans = KMeans(n_clusters=1, random_state=42)
    ratings = [ratings]

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
            # print(f"1: {entry[2][0]}")
            if entry[2][0] <= 5:
                new_data.append(entry)
    else:
        return "Invalid activity"
    
    # print(new_data)
    # Train clustering model for the chosen activity
    new_data = np.array(new_data)
    # new_data = new_data.reshape(-1, 1)
    clustering_model = train_clustering_model(new_data)

    ratings = [entry[2] for entry in new_data]
    cluster_labels = clustering_model.predict(ratings)
    chosen_cluster = clustering_model.predict([choice])[0]

    events_in_chosen_cluster = [new_data[i] for i, label in enumerate(cluster_labels) if label == chosen_cluster]
    best_event = max(events_in_chosen_cluster, key=lambda x: max(x[2]))

    return best_event[0]
    # if activity == 0:
    #     chosen_category = choice[0]  
    # else: 
    #     chosen_category = choice[1] 

    # relevant_ratings = [entry[2][chosen_category] for entry in data]
    
    # total_rating = 0
    # total_weight = 0
    # for i, rating in enumerate(relevant_ratings):
    #     weight = 1 / (i + 1) 
    #     total_rating += rating * weight
    #     total_weight += weight

    # if total_weight > 0:
    #     recommendation_score = total_rating / total_weight
    # else:
    #     recommendation_score = 0  
  
    # best_activity = None
    # best_rating = 0
    # for entry in data:
    #     activity_rating = entry[2][chosen_category]
    #     if activity_rating > best_rating:
    #         best_activity = entry[0]
    #         best_rating = activity_rating
    
choice = [0, 3, 2, 1, 2, 1]
activity = 0
day = "22.4.2024"
print(recommend(choice, activity, day))