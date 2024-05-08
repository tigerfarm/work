<?php
// https://www.twilio.com/docs/phone-numbers/regulatory/api/regulations?code-sample=code-fetch-a-regulation-instance&code-language=PHP&code-sdk-version=6.x

require __DIR__ . '/../../twilio-php-main/src/Twilio/autoload.php';

use Twilio\Rest\Client;

$twilio = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));

$rn = "RN569325039eb53a52cb387eedab3d3ffe"; // Indonesia numberType: Individual, local
echo '++ RN: ', $rn, "\xA";
$regulation = $twilio->numbers->v2->regulatoryCompliance
        ->regulations($rn)
        ->fetch();
echo 
   "+ SID: " . $regulation->sid
 . " isoCountry: " . $regulation->isoCountry
 . " requirements: " . $regulation->requirements
 . " numberType: " . $regulation->numberType
 . " friendlyName: " . $regulation->friendlyName
 . "\xA";
foreach ($regulation->requirements as $item) {
    echo "+ Name: " . $item . "\xA";
    foreach ($item as $item1) {
        echo "+ Name: " . var_dump($item1) . "\xA";
    }
}
/* Indonesia
 * 
 * https://www.twilio.com/guidelines/id/regulatory
 * Phone number types:
++   71: SID: RN581d4e917a8612eb36f0af24ecc6b592 isoCountry: ID numberType: toll-free friendlyName: Indonesia: Toll-Free - Business
++   72: SID: RNb6e54f22f77d4aff951e01a171fa2eec isoCountry: ID numberType: toll-free friendlyName: Indonesia: Toll-Free - Individual
++   73: SID: RN0ee6c4b35962f8dc999d3b71bb5160c2 isoCountry: ID numberType: mobile friendlyName: Indonesia: Mobile - Business
++   74: SID: RNc6d7a78cc4358d19c38b3fcbc0e3ba71 isoCountry: ID numberType: mobile friendlyName: Indonesia: Mobile - Individual
++   75: SID: RN48f693684e4546e1997cf77dac93da9f isoCountry: ID numberType: local friendlyName: Indonesia: Local - Business
++   76: SID: RN569325039eb53a52cb387eedab3d3ffe isoCountry: ID numberType: local friendlyName: Indonesia: Local - Individual

 * 
 * output :
$ php pRegulationsFetch1.php 
++ RN: RN581d4e917a8612eb36f0af24ecc6b592
+ SID: RN581d4e917a8612eb36f0af24ecc6b592 isoCountry: ID requirements: Array
+ Name: Array
array(6) {
  ["name"]=>
  string(8) "Business"
  ["url"]=>
  string(72) "https://numbers.twilio.com/v2/RegulatoryCompliance/EndUserTypes/business"
  ["fields"]=>
  array(1) {
    [0]=>
    string(13) "business_name"
  }
  ["detailed_fields"]=>
  array(1) {
    [0]=>
    array(2) {
      ["machine_name"]=>
      string(13) "business_name"
      ["friendly_name"]=>
      string(13) "Business Name"
    }
  }
  ["type"]=>
  string(8) "business"
  ["requirement_name"]=>
  string(13) "business_info"
}
+ Name: 
+ Name: Array
array(3) {
  [0]=>
  array(5) {
    ["description"]=>
    string(28) "May be anywhere in the world"
    ["type"]=>
    string(8) "document"
    ["name"]=>
    string(16) "Business Address"
    ["accepted_documents"]=>
    array(5) {
      [0]=>
      array(5) {
        ["url"]=>
        string(96) "https://numbers.twilio.com/v2/RegulatoryCompliance/SupportingDocumentTypes/business_registration"
        ["fields"]=>
        array(1) {
          [0]=>
          string(12) "address_sids"
        }
        ["detailed_fields"]=>
        array(1) {
          [0]=>
          array(2) {
            ["machine_name"]=>
            string(12) "address_sids"
            ["friendly_name"]=>
            string(14) "Address Sid(s)"
          }
        }
        ["type"]=>
        string(21) "business_registration"
        ["name"]=>
        string(21) "Business Registration"
      }
      [1]=>
      array(5) {
        ["url"]=>
        string(87) "https://numbers.twilio.com/v2/RegulatoryCompliance/SupportingDocumentTypes/utility_bill"
        ["fields"]=>
        array(1) {
          [0]=>
          string(12) "address_sids"
        }
        ["detailed_fields"]=>
        array(1) {
          [0]=>
          array(2) {
            ["machine_name"]=>
            string(12) "address_sids"
            ["friendly_name"]=>
            string(14) "Address Sid(s)"
          }
        }
        ["type"]=>
        string(12) "utility_bill"
        ["name"]=>
        string(12) "Utility Bill"
      }
      [2]=>
      array(5) {
        ["url"]=>
        string(87) "https://numbers.twilio.com/v2/RegulatoryCompliance/SupportingDocumentTypes/tax_document"
        ["fields"]=>
        array(1) {
          [0]=>
          string(12) "address_sids"
        }
        ["detailed_fields"]=>
        array(1) {
          [0]=>
          array(2) {
            ["machine_name"]=>
            string(12) "address_sids"
            ["friendly_name"]=>
            string(14) "Address Sid(s)"
          }
        }
        ["type"]=>
        string(12) "tax_document"
        ["name"]=>
        string(10) "Tax Notice"
      }
      [3]=>
      array(5) {
        ["url"]=>
        string(89) "https://numbers.twilio.com/v2/RegulatoryCompliance/SupportingDocumentTypes/rental_receipt"
        ["fields"]=>
        array(1) {
          [0]=>
          string(12) "address_sids"
        }
        ["detailed_fields"]=>
        array(1) {
          [0]=>
          array(2) {
            ["machine_name"]=>
            string(12) "address_sids"
            ["friendly_name"]=>
            string(14) "Address Sid(s)"
          }
        }
        ["type"]=>
        string(14) "rental_receipt"
        ["name"]=>
        string(12) "Rent Receipt"
      }
      [4]=>
      array(5) {
        ["url"]=>
        string(85) "https://numbers.twilio.com/v2/RegulatoryCompliance/SupportingDocumentTypes/title_deed"
        ["fields"]=>
        array(1) {
          [0]=>
          string(12) "address_sids"
        }
        ["detailed_fields"]=>
        array(1) {
          [0]=>
          array(2) {
            ["machine_name"]=>
            string(12) "address_sids"
            ["friendly_name"]=>
            string(14) "Address Sid(s)"
          }
        }
        ["type"]=>
        string(10) "title_deed"
        ["name"]=>
        string(10) "Title Deed"
      }
    }
    ["requirement_name"]=>
    string(38) "business_address_proof_of_address_info"
  }
  [1]=>
  array(5) {
    ["description"]=>
    string(0) ""
    ["type"]=>
    string(8) "document"
    ["name"]=>
    string(33) "Name of Authorized Representative"
    ["accepted_documents"]=>
    array(3) {
      [0]=>
      array(5) {
        ["url"]=>
        string(91) "https://numbers.twilio.com/v2/RegulatoryCompliance/SupportingDocumentTypes/national_id_card"
        ["fields"]=>
        array(2) {
          [0]=>
          string(10) "first_name"
          [1]=>
          string(9) "last_name"
        }
        ["detailed_fields"]=>
        array(2) {
          [0]=>
          array(2) {
            ["machine_name"]=>
            string(10) "first_name"
            ["friendly_name"]=>
            string(10) "First Name"
          }
          [1]=>
          array(2) {
            ["machine_name"]=>
            string(9) "last_name"
            ["friendly_name"]=>
            string(9) "Last Name"
          }
        }
        ["type"]=>
        string(16) "national_id_card"
        ["name"]=>
        string(35) "National ID for Indonesian citizens"
      }
      [1]=>
      array(5) {
        ["url"]=>
        string(83) "https://numbers.twilio.com/v2/RegulatoryCompliance/SupportingDocumentTypes/passport"
        ["fields"]=>
        array(2) {
          [0]=>
          string(10) "first_name"
          [1]=>
          string(9) "last_name"
        }
        ["detailed_fields"]=>
        array(2) {
          [0]=>
          array(2) {
            ["machine_name"]=>
            string(10) "first_name"
            ["friendly_name"]=>
            string(10) "First Name"
          }
          [1]=>
          array(2) {
            ["machine_name"]=>
            string(9) "last_name"
            ["friendly_name"]=>
            string(9) "Last Name"
          }
        }
        ["type"]=>
        string(8) "passport"
        ["name"]=>
        string(28) "Passport for non-Indonesians"
      }
      [2]=>
      array(5) {
        ["url"]=>
        string(91) "https://numbers.twilio.com/v2/RegulatoryCompliance/SupportingDocumentTypes/residence_permit"
        ["fields"]=>
        array(2) {
          [0]=>
          string(10) "first_name"
          [1]=>
          string(9) "last_name"
        }
        ["detailed_fields"]=>
        array(2) {
          [0]=>
          array(2) {
            ["machine_name"]=>
            string(10) "first_name"
            ["friendly_name"]=>
            string(10) "First Name"
          }
          [1]=>
          array(2) {
            ["machine_name"]=>
            string(9) "last_name"
            ["friendly_name"]=>
            string(9) "Last Name"
          }
        }
        ["type"]=>
        string(16) "residence_permit"
        ["name"]=>
        string(50) "Residence Permit (KITAP/KITAS) for-non Indonesians"
      }
    }
    ["requirement_name"]=>
    string(38) "name_of_authorized_representative_info"
  }
  [2]=>
  array(5) {
    ["description"]=>
    string(0) ""
    ["type"]=>
    string(8) "document"
    ["name"]=>
    string(13) "Business Name"
    ["accepted_documents"]=>
    array(1) {
      [0]=>
      array(5) {
        ["url"]=>
        string(96) "https://numbers.twilio.com/v2/RegulatoryCompliance/SupportingDocumentTypes/business_registration"
        ["fields"]=>
        array(1) {
          [0]=>
          string(13) "business_name"
        }
        ["detailed_fields"]=>
        array(1) {
          [0]=>
          array(2) {
            ["machine_name"]=>
            string(13) "business_name"
            ["friendly_name"]=>
            string(13) "Business Name"
          }
        }
        ["type"]=>
        string(21) "business_registration"
        ["name"]=>
        string(21) "Business Registration"
      }
    }
    ["requirement_name"]=>
    string(18) "business_name_info"
  }
}
+ Name: 
 */
?>
