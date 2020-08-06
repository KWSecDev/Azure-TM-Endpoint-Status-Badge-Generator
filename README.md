# Azure-TM-Endpoint-Status-Badge-Generator
NodeJS FunctionApp to generate badges with Traffic Manager's Endpoint Status.

The function App needs an Azure Service Principal to get Traffic Manager information.

# Parameters required
|Parameter Name| Expected Value|
|--|--|
|name| Name of the Traffic Manager |
|endpoint| Name of the endpoint to check status|

# Environment Variables

The following Environment Variables are needed for the function to generate the badge:

* **APP_ID:** Service Principal App ID
* **APPLICATION_SECRET:** Service Principal Secret Key
* **TENANT_ID:** Azure AD Tenant ID
* **AZURE_SUBSCRIPTION_ID:** Azure Subscription ID where the resource manager is located
* **TRAFFIC_MANAGERS_RESOURCE_GROUP:** Traffic Manager Resource Group Name