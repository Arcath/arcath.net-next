---
title: Expects
lead: Expects adds a way to type method inputs in Ruby
date: 2013-08-28T15:56:00+01:00
tags:
 - Ruby
---
Expects is lightweight DSL for defining what you expect a method to receive as input.

I’d expect this gem to be used more as a support gem, being a dependancy for other gems to use to make sure that what the end user/developer was passing met with requirements.

Expects is pretty simple to use, say you had this class

```ruby
class ARLikeAPI
    def self.find_by_email(email)
        SomeApi.where("email", email)
    end
end
```

Say `SomeApi.where` raises an exception if email isn’t a string, you could call `email.to_s` to convert email to a string, but what happens if email is some random class that can’t be converted? If you add expects to this class like this:

```ruby
class ARLikeAPI
    include Expects

    def self.find_by_email(email)
        expects email, String

        SomeApi.where("email", email)
    end
end
```

Now a call to `ARLikeAPI.find_by_email` that isn’t passed a string will raise `UnexpectedInput` which contains a human readable message of the problem as aswell as the subject (`email`) and the expected input (`String`)

You can also pass an array of classes to allow multiple types e.g.

```ruby
def add(num1, num2)
    expects num1, [Fixnum, Float]
    expects num2, [Fixnum, Float]
end
```

This would let a number of either Fixnum or Float through but raise an exception if anything else was passed.

There is an inverse method called `reject` which as the name implies lets anything through except for the items in the list.

Expects can also be used to validate input for example

```ruby
def send_email(email)
    expects email, /^.*@.*$/
end
```

This would raise an exception if the supplied string didn’t have an _@_ somewhere in the middle.

As I have said Expects main audience is Gem Developers who want to stop their code doing something damaging when the end user gives it an input that its not expecting.
