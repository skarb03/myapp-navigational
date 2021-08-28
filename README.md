# Node Application on EC2 Instance for AWS CloudFormation Template Example 

### AWS::CloudFormation::Init Metadata Configuration on aws-cfn-bootstrap

#### 1. packages: yum install
#### 2. sources: tarball download from github's repository
#### 3. files: redhat SysV init scripts
#### 4. commands: npm install
#### 5. services: sysvinit enable and start

### Deployment: Creating Stack
```bash
$ aws cloudformation create-stack --stack-name myapp /
--template-body https://raw.githubusercontent.com/kickscar/aws-practices/master/ch04/04/ex09.json /
--parameters ParameterKey=KeyName,ParameterValue={yourSSHkeyName} /
ParameterKey=VPC,ParameterValue={yourVPCId} /
ParameterKey=InstanceType,ParameterValue=t2.micro
```