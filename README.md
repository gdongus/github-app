# github-app

To configure GitHub to use the commit status to block merging of pull requests, you need to set up a branch protection rule. Here are the steps:

1. Navigate to your repository on GitHub.
2. Click on the "Settings" tab.
3. In the left sidebar, click on "Branches".
4. Under the "Branch protection rules" section, click on "Add rule".
5. In the "Branch name pattern" field, enter the name of the branch you want to protect. You can also use wildcards to match multiple branches.
6. Under "Protect matching branches", check the box that says "Require status checks to pass before merging".
7. In the list of status checks, find the one that corresponds to your Jenkins build (it's usually named something like "continuous-integration/jenkins") and check the box next to it.
8. Click on "Create" or "Save changes" to save the rule.

Now, pull requests that target the protected branches will require the Jenkins build to pass before they can be merged. If the build fails, the PR will be blocked from merging.

#########################################


Sure, here's a more detailed explanation of how to use GitHub App authentication for the Jenkins GitHub plugin:

Create a GitHub App:

Navigate to your GitHub organization settings (click on your profile picture in the top right corner, then click on "Settings").
In the left sidebar, click on "Developer settings".
Click on "GitHub Apps".
Click on "New GitHub App".
Fill in the necessary details like the App name, Homepage URL (you can use your Jenkins server URL), and Webhook URL (you can leave this blank if you don't want to use webhooks).
Under "Repository permissions", set "Statuses" to "Read & Write". This allows the app to update commit statuses.
Under "Where can this GitHub App be installed?", select "Anywhere" or "Only on this account", depending on your needs.
Click on "Create GitHub App".
Generate a private key for the GitHub App:

After creating the app, you'll be redirected to its settings page.
At the bottom of the page, in the "Private keys" section, click on "Generate a private key".
Download the generated .pem file. You'll need this to configure Jenkins.
Install the GitHub App:

Still on the app settings page, click on "Install App" in the sidebar.
Choose the account where you want to install the app and click "Install".
Select the repositories you want the app to have access to and click "Install".
Configure Jenkins to use the GitHub App:

Navigate to your Jenkins server.
Click on "Manage Jenkins" in the left sidebar.
Click on "Configure System".
Scroll down to the "GitHub" section.
Click on "Add GitHub Server" button and fill in your GitHub server details.
In the "Credentials" dropdown, click on "Add" and select "Jenkins".
In the "Kind" dropdown, select "GitHub App".
In the "App ID" field, enter the App ID from the GitHub App settings page.
In the "Private key" field, paste the contents of the .pem file you downloaded earlier.
Click on "Add".
Select the added credential from the dropdown.
Click on "Test Connection" to make sure everything is set up correctly.
Click on "Save" or "Apply" to save your changes.
Now, Jenkins will authenticate with GitHub as the GitHub App, and it will have the necessary permissions to update commit statuses. You can use this in your Jenkinsfile just like you would with a Personal Access Token.


####################


To configure the GitHub plugin to have the proper permissions to update the commit status in GitHub from a Jenkins pipeline, you need to set up a GitHub Personal Access Token (PAT) with the appropriate permissions and then configure Jenkins to use this token.


Generate a Personal Access Token on GitHub:

Navigate to your GitHub settings (click on your profile picture in the top right corner, then click on "Settings").
In the left sidebar, click on "Developer settings".
Click on "Personal access tokens".
Click on "Generate new token".
Give your token a descriptive name, and check the following scopes: repo:status and public_repo (or repo for private repositories).
Click on "Generate token" at the bottom of the page.
Copy the generated token. You'll need to enter this in Jenkins.
Configure Jenkins to use the GitHub Personal Access Token:

Navigate to your Jenkins server.
Click on "Manage Jenkins" in the left sidebar.
Click on "Configure System".
Scroll down to the "GitHub" section.
Click on "Add GitHub Server" button and fill in your GitHub server details.
Click on "Add" next to "Credentials", select "Jenkins".
In the "Kind" dropdown, select "Secret text".
In the "Secret" field, paste your GitHub Personal Access Token.
Give your credential a descriptive ID (you'll use this in your Jenkinsfile).
Click on "Add".
Select the added credential from the dropdown.
Click on "Test Connection" to make sure everything is set up correctly.
Click on "Save" or "Apply" to save your changes.