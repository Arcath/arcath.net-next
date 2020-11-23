---
title: CanCan Route Constraints
lead: Using CanCan to lock down routes
date: 2013-11-02T11:32:00+00:00
tags:
 - CanCan
 - Ruby
---
I use Sidekiq to handle the background jobs which is working great, but I noticed that some of them seemed to be failing! I had no way of seeing which jobs where failing or why because I handn’t mounted the WebUI anywhere. The issue I had was securing it, I can’t just rely on the fact that a random user wont know that it is at `/sidekiq`, especially since it lets you perform some job control.

The only solution is to secure access to it, which I can only do within the routes. I also wanted to use the Authorization system I already had in place instead of adding something extra in (like HTTP basic etc…).

I use [CanCan](https://github.com/ryanb/cancan) which is a great solution, I just need to get it working in the router.

The class I wrote to do this is actually pretty simple:

```ruby
class CanCanConstraint
    def initialize(action, resource)
        @action = action
        @resource = resource
    end

    def matches?(request)
        if request.session['user_id'].present?
            current_user = User.find(request.session['user_id'])
            ability = Ability.new(current_user)
            return ability.can?(@action, @resource)
        else
            return false
        end
    end
end
```

For my uses I mounted sidekiq like this:

```ruby
mount Sidekiq::Web, at: '/sidekiq', constraints: CanCanConstraint.new(:manage, :sidekiq)
```

So how does it work?

The router lets you pass a class to the route constraints option, the only requirement being that this class/instance of a class has to respond to `matches?`. So my `CanCanConstraint` class is re-usable as it lets you specify which permission in CanCan you want to check the user has, in this case I check if the user can manage sidekiq (this is the same as using `can? :manage, :sidekiq` in a view).

When `matches?` gets called it first checks if the session variable of `user_id` exists (assuming that guests would not be given access) and if it doesn’t return false. If it does exist it finds that user in the same way that `ApplicationController#current_user` does and then passes that user to `Ability.new` which is exactly what CanCan does (which is why you write your code in initialize). This then gives you the `can?` method same as in views. can? returns true or false based on the users assigned permissions, if you meet the requirements and it returns true the router will allow that route to exist for you.

This means that for anyone not given manage permissions on sidekiq the route simply wont exist, you will get a 404 instead of a 403.
