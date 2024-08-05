import aws_cdk as cdk
from cdk.cdk_stack import httpApi
app = cdk.App()
httpApi(app, "httpApi")
app.synth()
