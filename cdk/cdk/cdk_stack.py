import os
from aws_cdk import (
    Stack,
    aws_lambda as lambda_,
)
from constructs import Construct
from dotenv import load_dotenv

class serverLambda(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)
        load_dotenv()
        nest_js_lambda = lambda_.Function(self, "NestJsLambda",
            runtime=lambda_.Runtime.NODEJS_20_X,
            function_name='NestJsLambda',
            handler="bundle.handler",
            code=lambda_.Code.from_asset("bundle"),  
            memory_size=1024,
            environment={
                'DB_HOST': os.getenv('DB_HOST'),
                'DB_PORT': os.getenv('DB_PORT'),
                'DB_USERNAME': os.getenv('DB_USERNAME'),
                'DB_PASSWORD': os.getenv('DB_PASSWORD'),
                'DB_NAME': os.getenv('DB_NAME'),
            },
        )
        lambda_url = nest_js_lambda.add_function_url(auth_type=lambda_.FunctionUrlAuthType.NONE)