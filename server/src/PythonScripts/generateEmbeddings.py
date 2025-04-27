from sentence_transformers import SentenceTransformer
import sys
import json

# Initialize the model
model = SentenceTransformer('all-MiniLM-L6-v2')  # Example SBERT model(smaleest model h ye)

# Get the question from the command line
sentence = sys.argv[1]

# Generate the embedding for the sentence
embedding = model.encode(sentence)

# Print the embedding as a JSON list
print(json.dumps(embedding.tolist()))
