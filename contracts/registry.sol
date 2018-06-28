
pragma solidity ^0.4.20;

contract registry {
    address public land_owner;
    uint256  public lattitude;
    uint256  public longitude;
    uint256 public area_in_meter_square;
    uint256 public price;
    address public admin;
    address public registrar_address;
    
    
    event registryAdded(string OwnerName, uint256 price);
    event SignatureAdded (string digitalFingerPrint , string signature , uint256 timestamp);
     
    mapping (bytes32 => string ) fingerprintSignatureMapping;   
    
    modifier isAdmin() {
        require (msg.sender == admin);
        _;
    }
    
    modifier isRegistar(){
      require(msg.sender==registrar_address);
      _;
    }
  constructor(address _admin,address _registrar_address ) public {
        registrar_address = _registrar_address;
        admin=_admin;
      
    }
    
    function setRegistryDetails(
      address _land_owner, 
      uint256 _price,
      uint256 _lat, 
      uint256 _longitude,
      uint256 _area_in_met_square
      ) public isRegistar() {
        land_owner = _land_owner;
        price = _price;
        lattitude = _lat;
        longitude=_longitude;
        area_in_meter_square=_area_in_met_square;
    }
  
    
     function addSignature(string digitalFingerPrint , string signature) public  {
        fingerprintSignatureMapping[keccak256(digitalFingerPrint)] = signature;
    emit    SignatureAdded(digitalFingerPrint , signature, now );
    }
    
       function getSignature(string digitalFingerPrint) public constant returns (string){
        return fingerprintSignatureMapping[keccak256(digitalFingerPrint)] ;
   }


   
   function transferOwnership(address newAdmin) public isAdmin {
       admin = newAdmin;
   }
}
