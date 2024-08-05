from aws_cdk import (
    Stack,
    aws_apigatewayv2 as apigateway,
    aws_apigatewayv2_integrations as integrations,
)
from constructs import Construct

class httpApi(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)
        eb_app_url = 'http://romanneudakh-cart-api-task2.eu-west-1.elasticbeanstalk.com/'
        api = apigateway.HttpApi(
            self, "HttpApi",
            api_name="ebProxyApi",
            description="This API proxies to eb application"
        )
        integration_root = integrations.HttpUrlIntegration(
            'ebIntegration',
            url=eb_app_url
        )
        integration_cart = integrations.HttpUrlIntegration(
            'ebIntegration',
            url=f"{eb_app_url}api/profile/cart"
        )
        api.add_routes(
            path="/api/profile/cart",
            methods=[apigateway.HttpMethod.GET, apigateway.HttpMethod.PUT], 
            integration=integration_cart
        )
        api.add_routes(
            path="/{proxy+}",
            methods=[apigateway.HttpMethod.ANY],
            integration=integration_root
        )