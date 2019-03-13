# Securing your credentials


### Authenticating using a Project ID
Infura's API's require a valid `Project ID` to be included with your request traffic. This identifier should be appended
to the request URL.

```curl https://<network>.infura.io/v3/YOUR-PROJECT-ID```


### Authenticating using a Project ID and Project Secret

As additional protection for your request traffic, you should use HTTP Basic Authentication to access our API when you are able to ensure the confidentiality of the `Project Secret`:
```
curl --user :YOUR-PROJECT-SECRET \
  https://<network>.infura.io/v3/YOUR-PROJECT-ID
```
Note that the user field of the request is left blank and the project id is passed in the URL.