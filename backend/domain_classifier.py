import pickle


# Load trained model
model = pickle.load(open("domain_model.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))


def predict_domain(text):

    features = vectorizer.transform([text])

    prediction = model.predict(features)

    return prediction[0]