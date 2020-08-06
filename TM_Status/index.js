const { makeBadge, ValidationError } = require('badge-maker');
const Utility = require("./utility");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (Utility.validateRequestParameters(req)) {
         
        try {

            // Get Traffic Manager Information
            return Utility.getTrafficManagerInfo(req)
            .then((trafficManager)=>{
                // Badge Label must be TM Endpoint Target
                let badgeLabel = `${trafficManager.endpointName}`;
                
                // Based on endpoint configuration generate the badge
                let format = Utility.getBadgeFormat(trafficManager, badgeLabel);
                
                // Generate SVG badge
                let svg = makeBadge(format);

                context.res = {
                    // status: 200, /* Defaults to 200 */
                    body: svg,
                    headers: {
                        'Content-Type': 'image/svg+xml'
                    }
                };
            });
            
        } catch (e) {
            console.log(e) // ValidationError: Field `message` is required
        }
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a Traffic Manager name and the endpoint on the query string or in the request body"
        };
    }
};