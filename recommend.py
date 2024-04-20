from ret_data import ret_data
from sklearn.cluster import KMeans

def recommend(choice, activity, day):
    data = ret_data()
    
    # Filter data based on the specified day
    filtered_data = [entry for entry in data if entry[1] == day]
    
    # Extract ratings for all features from the filtered data
    ratings = [[entry[2][i] for i in range(len(choice))] for entry in filtered_data]

    # Fit KMeans clustering model
    kmeans = KMeans(n_clusters=3, random_state=42)
    kmeans.fit(ratings)

    # Predict cluster labels for each event
    cluster_labels = kmeans.predict(ratings)

    # Determine which cluster center is closest to the user's choices
    chosen_cluster = kmeans.predict([choice])[0]

    # Get events belonging to the chosen cluster
    events_in_chosen_cluster = [filtered_data[i] for i, label in enumerate(cluster_labels) if label == chosen_cluster]

    # Find the event with the highest rating in the chosen cluster
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
    
print(recommend(choice, activity, day))