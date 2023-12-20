#/bin/sh

ISSUER="$1"
TIME_TO_LIVE="$2"
PRIVATE_KEY_FILE="$3"

base64_url_encode() {
    # Use `tr` to URL encode the output from base64.
    base64 | tr -d '=' | tr '/+' '_-' | tr -d '\n'
}

to_json() {
    jq -Mc . | tr -d '\n'
}

sign_rs256() {
    openssl dgst -binary -sha256 -sign "$PRIVATE_KEY_FILE"
}

issued_at=$(date +%s)
expires_at=$((issued_at + TIME_TO_LIVE))
header="{
    \"typ\": \"JWT\",
    \"alg\": \"RS256\"
}"
payload="{
    \"iss\": \"$ISSUER\",
    \"iat\": $issued_at,
    \"exp\": $expires_at
}"

payload_b64=$(echo -n "${payload}" | to_json | base64_url_encode)
header_b64=$(echo -n "${header}" | to_json | base64_url_encode)

token_b64="${header_b64}"."${payload_b64}"
signature=$(echo -n "${token_b64}" | sign_rs256 | base64_url_encode)

echo "${token_b64}.${signature}"
