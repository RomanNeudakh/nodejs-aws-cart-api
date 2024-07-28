from aws_cdk import (
    Stack,
    aws_lambda as lambda_,
)
from constructs import Construct

class serverLambda(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        nest_js_lambda = lambda_.Function(self, "NestJsLambda",
                                          runtime=lambda_.Runtime.NODEJS_20_X,
                                          function_name='NestJsLambda',
                                          handler="bundle.handler",
                                          code=lambda_.Code.from_asset("bundle"),  
                                          memory_size=1024,
                                          environment={
                                              'DB_HOST': 'database-1.c7qgu0se05ac.eu-west-1.rds.amazonaws.com',
                                              'DB_PORT': '5432',
                                              'DB_USERNAME': 'postgres',
                                              'DB_PASSWORD': 'hjvfyytdlf[',
                                              'DB_NAME': "postgres",  
                                          },
                                          )

        lambda_url = nest_js_lambda.add_function_url(
                                        
                                         auth_type=lambda_.FunctionUrlAuthType.NONE)