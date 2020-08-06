const msRestAzure = require("ms-rest-azure");
const TrafficManagerManagementClient = require("azure-arm-trafficmanager");

module.exports = {

    getBadgeFormat:function(trafficManager, badgeLabel){
        if(trafficManager.status === 'Enabled')
            return this.getEnabledBadgeFormat(badgeLabel);
        else
            return this.getDisabledBadgeFormat(badgeLabel);
    },
    
    getTrafficManagerInfo:function(req){
    
        let trafficManagerResult = {
            name: (req.query.name || (req.body && req.body.name)) ,
            endpointName: '',
            status: ''
        }
        let endpointParameter = (req.query.endpoint || (req.body && req.body.endpoint));
        const clientId = process.env['APP_ID'];
        const secret = process.env['APPLICATION_SECRET'];
        const domain = process.env['TENANT_ID'];
        const subscriptionId = process.env['AZURE_SUBSCRIPTION_ID'];
        const resourceGroupName = process.env['TRAFFIC_MANAGERS_RESOURCE_GROUP'];
        let client;

        // Get Traffic Manager Information from Azure
        
        return msRestAzure.loginWithServicePrincipalSecret(clientId, secret, domain).then((creds) => {
            client = new TrafficManagerManagementClient(creds, subscriptionId);
            return client.profiles.get(resourceGroupName, trafficManagerResult.name);
        }).then((result) => {
            console.dir(result, {depth: null, colors: true});

            result.endpoints.forEach(endpoint => {
                // Get endpoint status based on the endpoint name
                if(endpoint.name.includes(endpointParameter)){
                    trafficManagerResult.endpointName = endpoint.target;
                    trafficManagerResult.status = endpoint.endpointStatus;
                }
            });

            return trafficManagerResult;
        }).catch((err) => {
            console.dir(err, {depth: null, colors: true});
        });
    },
    
    validateRequestParameters:function(req){
        return (req.query.name || (req.body && req.body.name)) && (req.query.endpoint || (req.body && req.body.endpoint));
    },
    
    getEnabledBadgeFormat:function(labelText) {
        return {
            label: labelText,
            message: 'Enabled',
            color: 'green'
        };
    },
    
    getDisabledBadgeFormat:function(labelText) {
        return {
            label: labelText,
            message: 'Disabled',
            color: 'red'
        };
    }

}

