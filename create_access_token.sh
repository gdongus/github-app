#!/bin/bash

APP_ID="$1"
APP_INSTALLATION_ID="$2"

# Create a JWT for the Github App
JWT=$(./issue-jwt.sh "$APP_ID" 60 /etc/app-secrets/appPrivateKey)
if [ -z "$JWT" ]; then
    echo "Failed to issue a JWT token" >&2
    exit 1
fi

# Request an access token for the App
response=$(curl -sS -X POST "https://api.github.com/app/installations/$APP_INSTALLATION_ID/access_tokens" -H "Authorization: Bearer $JWT")
ACCESS_TOKEN=$(echo -n "${response}" | jq -r .token)

echo "response: $response"


if [ -z "$ACCESS_TOKEN" ]; then
    echo "Failed to obtain an access token" >&2
    exit 1
fi

echo "ACCESS_TOKEN: $ACCESS_TOKEN"