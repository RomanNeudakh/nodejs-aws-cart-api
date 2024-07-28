import aws_cdk as cdk
from cdk.cdk_stack import serverLambda
app = cdk.App()
serverLambda(app, "serverLambda")
app.synth()
