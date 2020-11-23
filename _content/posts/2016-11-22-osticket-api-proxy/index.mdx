---
title: OSTicket API Proxy
lead: OS Ticket requires to to add the ip for everything that might want to use the API. This causes issues when you want anyone to be able to open tickets from a desktop app.
date: 2016-11-22T12:46:00Z
tags:
 - PHP
---
Over at Ed-IT Solutions we use OSTicket for our help desk. We like it and it does its job very well. Early in the development of our [support app](/2016/11/electron-app-customer-support/), the question was asked, “Can users open tickets from inside the app?”. Yes! They can, but some trickery is going to be needed to get it working. OSTicket has this odd restriction that every API key needs to be assigned to one IP and one IP only. Hence the need for an OSTicket API Proxy. Our app is on hundreds of computers on various ISPs, on laptops that travel all over the place. A single IP does not exist.

The answer is to proxy the API requests through another API.

## Setup

Create an API key on your OSTicket for the IP of your web server. Upload this file to your web server.

```php
<?php
$config = array(
  'url'=>'https:/yoursite.com/api/tickets.json',
	'key'=> $_POST['apiKey']
);

$data = array(
	'name'      =>      $_POST['name'],
  'email'     =>      $_POST['email'],
  'subject'   =>      $_POST['subject'],
  'message'   =>      $_POST['message'],
  'ip'        =>      $_SERVER['REMOTE_ADDR'],
	'topicId'   =>      '19' // Change to the id of your default topic.
);
set_time_limit(30);
$options = array(
  'http' => array(
    'header'  => "X_API_Key: ".$config['key'],
    'method'  => 'POST',
		'content' => json_encode($data)
   )
);
$context  = stream_context_create($options);
$result = file_get_contents($config['url'], false, $context);
if ($result === FALSE) { die("FAILED"); }
echo($result);
?>
```

The topic ID needs changing to the ID of one of your topics. We have everything come into a generic support topic which we categorize after we read it.

## Using OSTicket API Proxy

To create a ticket send a POST request to the address of the API file from above. Your post data need to contain:

 - `apiKey` – The osTicket API Key, this means you still need the API key in each client.
 - `name` – The name of the user
 - `email` – The user’s email address
 - `subject` – The tickets subject
 - `message` – The tickets message

I specifically wanted my clients to require the API Key, this stops an attacker finding your API Proxies address and sending thousands of tickets through it.

The API proxy returns the response from OSTicket or _Failed_ if there was a problem making the request to OSTicket.

We have been using this quite successfully for a couple of weeks now and I am pretty happy with it. It would be possible to move the topic ID into your post data if you want that selection to be made by the user in your app.
