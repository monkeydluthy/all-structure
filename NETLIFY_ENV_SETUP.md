# Netlify Environment Variables Setup

## Required Environment Variables for Google Analytics

Add these three environment variables to your Netlify site dashboard:

### 1. GA_SERVICE_ACCOUNT_EMAIL
**Value:**
```
analytics-reader@all-structure-maintenance.iam.gserviceaccount.com
```

### 2. GA_SERVICE_ACCOUNT_PRIVATE_KEY
**Value:** (Copy the entire thing, including headers)
```
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCzUuywtnZu9CbI
K0OEPUg+pbQmll25cW2JZ8hf5KpDkJEzzHzNKDDr7ZZZKMLKwJBAGxlvQvx+rMQQ
Qk33/+WkkApb6FCyBweC9vFLgo0VwNKxs2VF8JH8uRCRnjxNPWw6bIX97vQU57kP
W4kAXlqLdFdJX5ce/BnB+2P+VGMkANvHo2D5YtE1yF38Xy6HnrlQV+eWD5an8+xa
KSYV5KS+uavx3jPadA2HHA7z5qO+bdBl8X8HGXJtpoXx+ZpQ2myIhrnrp3bFcPho
nDnyY/kM0CVU9YLW/KPulji/6k+is4xXruFu/H7iqlwejGjEAUo4syJH+Ich2THL
J+Z0CshpAgMBAAECggEAAWfqtpAGGpn0BSn9j1BtoVaqRjxz0JRDrhLfDHuHw7Um
lEk0tjpy+y+psN27w8pgArThBKEdjjJOQe/gQSS3NJracbdUW2mhOUtC37zyTk86
6lJ/yR0+Y4vInvU0rfcSTZWupmusnXlJyRr4ISHfzRvZTYLsgFnCAOKaZBvBoIHb
zPVkSLo1iaXrl2KCJA3qHffrPpmiuNRTOo6J39bcVV7gV4Vsu7X5NCmEVm2L961t
STnxbM2bQAPJKrq0uz/8MRkaVS9yYsXofFsnz4DgOz7h95NjSKFqo5Cn1YxyMeOy
HzkaHXey0N/SEiPu8CYUZUSaT4zwsXs5KVBFaYw4QQKBgQDWiDGpQuj6KjQWnYbA
hVmcbBhGsts+ju1V3pAg+EZm/Sd9BA+8OQpGlqjh/tq5+yT5sIy6akWKIM2ARDU9
KdGX5OznUsfENbGX53WhjAgZEXi6MmMQbSlkTOOob4wTkavCKVy36C1hKhkkmKId
oJccCIF+PFzPE0XEfE0DJ//MqQKBgQDV/IJux8y5tsF9zykMDgUdnT1l4RyymWSr
O2TEkqIl3UGySMJ8oNi5YogIO7wvrhfbfzNozwzb5tTLKC4pCk5bEjaXgNqm7i6B
YzGK46PQeePo/IQVBxjDPFO/6SZ8D2yUJIkP2pczabzKdT5BKRgTNSDq9bFP3oK4
dcV0jU61wQKBgHqViAr3uLh5tRnXGVCY4gOHoLeFK9IrSWJvslukglYHAbFlyLf8
v+pl3EqGneT3pMEoKMG8R9ANvl80mldAtgrdPKFRo+Rx6fCqyYRtx5LLcPi0IfcY
6TXu2Yc9dgUYj9R6XgiYGpYSwBsxPDFBuhbCpXvEciPBF3SWskrDaF9BAoGAG3qx
xUgjIjY14tIXk1S5k3P9znd6F/Va2CJoblXmPLaNGTf+wcJmEmh0z5ncMMNKjQVo
tKziGdsquGwQgXSxW0Cbghkp+wXbMwJp+kwBXWRJwEGtNIYUx/2XQ63NI2FXsC6A
62hGwnNxqw4jUHrWfKD1+TZT7s3EO6vkD3OWCAECgYEAuPo+GAvtBxr9kqdWeXQ6
IXN6EgEM6hyvloop1Z+vLJUj6PjaFpRZQD4SRP4YoT1sa2LjTw9ANtrMM0e/bHDg
CbCvMqqn3ZucQH2I9UaP6TVEbIRSpyqLlYmW2pQxzc2PNA+WhtPYjg0wzaZqQQCu
PJxIf15YiIIno6VZmXPN89o=
-----END PRIVATE KEY-----
```

### 3. GA_PROPERTY_ID
**Value:**
```
495490739
```

## How to Add These in Netlify

1. Go to https://app.netlify.com/
2. Select your site: **all-structure-maintenance**
3. Go to **Site settings** → **Build & deploy** → **Environment**
4. Click **Add a variable**
5. Add each variable with its corresponding value
6. Save and **Trigger deploy** if needed

## Important Notes

- The private key must include the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` headers
- Copy it exactly as shown above
- Netlify will store these securely and never expose them to the frontend
- After adding variables, trigger a new deployment if the function isn't working

