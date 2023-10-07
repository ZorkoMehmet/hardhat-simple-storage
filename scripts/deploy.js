const {ethers, run, network} = require("hardhat")


async function main(){
    const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    console.log("Deploying contract...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.getDeployedCode()
    console.log(`contract address: ${simpleStorage.target}`)

    try{
      if(network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY){
        await simpleStorage.deploymentTransaction().wait(6)
        await verify(simpleStorage.target, [])
      }
    } catch (e) {console.log(e)}  

    const currentValue = await simpleStorage.retrieve()
    console.log(`Current value is: ${currentValue}`)

    const transactionResponse = await simpleStorage.store("3")
    await transactionResponse.wait(1)
    const newFavNumber = await simpleStorage.retrieve()

    console.log(`Updated current value is: ${newFavNumber}`)
}

async function verify(contractAddress, args) {
    console.log("Verifying contract...")

    try {
      await run("verify:verify", {
        address: contractAddress,
        constructorArguments: args
      })
    } catch(e){
        if(e.message.toLowerCase().include("already verified")){
          console.log("Already verified!")
        } else{
          console.log(e)
        }
      }
}

main()
  .then(()=> process.exit(0))
  .catch((error)=> {
    console.error(error)
    process.exit(1)
  })