# Securing Your Credentials


### Authenticating using a Project ID
Infura's Ethereum APIs require a valid `Project ID` to be included with your request traffic. This identifier should be appended
to the request URL.

```curl https://<network>.infura.io/v3/YOUR-PROJECT-ID```


### Authenticating using a Project ID and Project Secret

As additional protection for your request traffic, you should use HTTP Basic Authentication to access our API when you are able to ensure the confidentiality of the `Project Secret`:
```
curl --user :YOUR-PROJECT-SECRET \
  https://<network>.infura.io/v3/YOUR-PROJECT-ID
```
Note that the user field of the request is left blank and the project id is passed in the URL.

#### Require a Project Secret

By default, the Project Secret is optional. If you know you will only be interacting with Infura APIs from a secure environment (e.g. your backend web application),
you can toggle the *Private Secret Required* setting in your Project's configuration page under the *Security* section. 
