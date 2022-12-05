# Identity Authentication - Angular Client
Basically this code is stitching / wiring with https://github.com/khoirmuhammad/Auth-Identity.

## Registration
- We put double validation both in client or backend service. Client validation can make user easier user work with from, whereas backend validation can prevent from hack attacker that try to penetrate our application. In clieant validation we able to see built-in standard validation by angular or make custom validation like CustomPasswordValidatorService
- To intercept our HTTP request and response we choose interceptor mechanism. For instance modifying response message from backend service by ErrorHandlerService

## Email Confirmation or Activation
- Once all of values pass from validation. The next process is saving user data and mapping role by ASP NET Core Identity User Manager. The subsequent process is sending email to confirm account. Here the following process
1. In UserRegistration body, we sent callback URL that will be used in mail content
2. In backend service this url will be modified i.e adding token and email as query string before appending on mail maessage
3. After users receive the email, they will click to URL (callback URL in step 1)
4. Finally angular client will call method EmailConfirmation in order to proceed the activation
