<?php 
echo "+ Downloaded a URL to a file.\xA";

// Initialize a file URL to the variable.
// If the URL is a Twilio MMS media URL, the following will automatically use a redirect to get the actually media bytes for downloading.
// $theUrl = 'https://contribute.geeksforgeeks.org/wp-content/uploads/gfg-40.png';
// Following is a Twilio MMS media URL:
$theUrl = urldecode('https://media.twiliocdn.com/fax/ACa...3/e6ec88730abf647857171b943e8aa2ace7149471ee4277396c7aa04c299fc0b79ea899a0a4ece20420fa9b8e23c39cb4bc9fafc3fe2019cce56f408af827ef24?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLWVhc3QtMSJIMEYCIQC7uozx5L1Bgjm4%2FCYEdN0l8BUYdADIsk51wlamVzwzggIhAKjDh0278s50BYizUnva28MdF2IaT71T4%2FF%2FU6oS8EjOKr0DCMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMjAxMTY0OTIxNDA4IgzmpJq76F6MRBUnNGMqkQMcJ8jw24ITKNwmGkP1q%2Fa%2Bb%2FgM5CqjX9ir%2BVI4BKNrQz6NnYWUsO2vcj5%2F67Gk1RNimv2Bkok9FLt1XipdarD4rYZt1ZQLruLguh9T8cStX1d1ZtNnus8BvZE0srGC7W1AaHNLYhVid6EZeRcM%2FlKqvQQs%2BdhUGUNyMoR9hWCxvt4I%2Fw98WPnE%2BzYx3awB1%2BPi09uxE12svajy7kvhmv6sK3t9G%2BKlOJVaN6Nw3uQk%2BfDZunzjF3WAvImETwDNc%2Fo2hxorR73iZnNBXDQn3hVeaOAOKRWU%2FfW3rH3emkJXVypQMCizmLPnZ1z5GqTTnqM5pfb15wRAtMN%2BxqhGcTl3WeMp3LEWM%2FDdoCjtZaVVY%2Fl726ejYj9hiYCoOwoGrFTy087tdVoXwvbPcJnsx%2F6enxxhUnM1JqopOmqz98GPMXvSwIA77M4fOK4%2F1buF06EnA35Zukyi21vYpLo7l0f5x4EQfI5UB%2FzM4RCefucxAFCMyY9zLQG16S1n9LFeC6WWaxYYPExqVkCnROJDtrDtxjCinLv9BTrqAc4zCtVor%2Banh8e%2BnmJ7eIIx2Rr%2B3KeQPYq1WEZDJPzzaLNqrY2BOYreMIo6eHCauDVZEA5xl31URyNNK42oJd8CLq7zAGdUN6aRNfJ8Odtz1sq6h9RLFDF3O8v1AKzLZYab28DBl5F5lxSFfnzTHmJZQ4SOtHqBjkiLZC8xUv%2FpRKx5kM7Eu0Edz5Y1mACjxRiLkAcMN0MO%2FcXxaiJWagnhBwz2QhzzTHNpPurcjY6OW0FmxytrQb87tVdtz0RjnrH0%2Bwzel4QfXLvq5p6p6oplsrdIfPlKHIUM2TCw%2BBKintUP9KVYTf5x7g%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20201113T184804Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Credential=ASIAS5VS5DJALYQWCX6P%2F20201113%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=08f67aa6ede01fcd68aff408be2ecb4c8afd66c914d2d42f1e8dc01703e2250c');
echo "+ theUrl = " . $theUrl . "\xA";
$file_name = "downloadFile3.jpg";
echo "+ Download to filename: " . $file_name . "\xA";
// Use file_get_contents() function to get the file 
// from url and use file_put_contents() function to 
// save the file by using base name 
if(file_put_contents( $file_name,file_get_contents($theUrl))) { 
    echo "++ File downloaded successfully"; 
} 
else { 
    echo "-- File downloading failed."; 
} 
  
?> 
