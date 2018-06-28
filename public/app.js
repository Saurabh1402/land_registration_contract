App = {

	web3Provider:null,
	contracts:{},
	account:'0x0000000000000000000000000000000000000000',
	new_owner:null,
	coordinates:null,
	price:null,
	admin:null,
	digitalFingerPrint:null,
	signature:null,
	owner_address:null,
	token_address:null,


	init:function(){
		console.log("App loaded succesfully");
		return App.initWeb3();
	},

    initWeb3:function(){

		if(typeof web3 !== 'undefined'){
			App.web3Provider=web3.currentProvider;
			web3=new Web3(web3.currentProvider);
		}else{
			App.web3Provider=new Web3.providers.HttpProvider("https://rinkeby.infura.io/tPNyqnWI32IepQh2lrMf");
			web3=new Web3(App.web3Provider);
		}		

	},

	setRegistryDetails : function () {
		App.price = $('#price').val();
		App.coordinates = $('#coordinates').val();
		App.owner_address = $('#owner_address').val();

		$.getJSON('./registry.json',function(landregistry){
			App.contracts.registryContract = TruffleContract(landregistry);
			App.contracts.registryContract.setProvider(App.web3Provider);
			App.contracts.registryContract.deployed().then(function(registryContract){
				console.log('Token Address',App.token_address);

				return registryContract.registry(App.owner_address,App.price,App.coordinates,{
					value:0,
					gas:200000
				});
			}).then(function(receipt){
				console.log(receipt);
			});
		});

	},

	transferownership : function (){
		App.new_owner = $('#other_owner').val();
		$.getJSON('./registry.json',function(landregistry){

			App.contracts.registryContract = TruffleContract(landregistry);
			App.contracts.registryContract.setProvider(App.web3Provider);
			App.contracts.registryContract.deployed().then(function(registryContract){

				return registryContract.transferOwnership(App.new_owner,{
					value:0,
					gas:200000
				});
			}).then(function(receipt){
				console.log(receipt);
			});
		});
	},

	addSignature: function(){
		App.digitalFingerPrint
	}

}

	$(function(){
	$(window).on('load',function(){
		App.init();
	});
	$('#InitiateContract').on('click',function(){
		App.registry();
	});
	$('#trasnferOwnership').on('click',function(){
		App.transferownership();
	});
})
