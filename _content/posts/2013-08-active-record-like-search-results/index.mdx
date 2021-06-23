---
title: Active Record like Search Results
lead: Crafing Active Record like arrays for returning data
date: 2013-08-29T14:11:00+01:00
tags:
 - Ruby
 - Adauth
---
Active Records output may look like an array but its actually a special class that behaves like an array but has a lot of extensions attached to it.

For [Adauth](http://adauth.arcath.net/) I want to provide results in something more than an array with the ability to order etc… but not over complicate things for the end user (if you just want an array you can still get it). So how do we make something like AR?

So straight away lets create a new class that inherits from `Array` and to begin with it needs no extra methods because `Array.new` can take an array and obviosuly that will return our new object acting as an `Array`.

This new class would look like this

```ruby
class SearchResults < Array
end
```

That now means that you can create your new class quickly from array returns by calling `SearchResults.new(SomeThing.query("foo"))` instead of just `SomeThing.query("foo")`.

Now that we have our class lets start using it! First and easiest functionality is `limit(x)` which is pretty simple 1 line function

```ruby
def limit(x)
    return self[0..(x-1)]
end
```

This simply returns a new instance of self that is limited to the range of 0 to the supplied value.

The next function to bring to the table is `order` which should take a couple of options e.g. `order(:name, :asc)` which should look something like this

```ruby
def order(field, direction)
    case direction
    when :asc
        return sort! { |x, y| x.send(field) <=> y.send(field) }
    when :desc
        return order(field, :asc).reverse!
    else
        raise "Invalid Order Provided, please use :asc or :desc"
    end
end
```

This assumes that your search results are objects with the data retrievable via methods but you can sort your objects how ever you want as long as they match what your user is asking for. The advantage to this setup is that your code becomes very “englishy” and is very easy to read.

Taking my example from earlier of `SearchResults.new(SomeThing.query("foo"))` you can now:

```ruby
SearchResults.new(SomeThing.query("foo")).limit(3)
SearchResults.new(SomeThing.query("foo")).order(:age, :desc)
SearchResults.new(SomeThing.query("foo")).order(:name, :asc).limit(2)
```

Things look even nicer if your gem returns its data using your search results class as you wont need the `.new` so it looks like this:

```ruby
YourGem.some_dataset.order(:name, :asc)
YourGem.all.limit(3)
```

The rest of the `Array` methods are still there and will function exactly the same.

*Be warned, any none destructive methods (no !) will return a new Array not a new SearchResults*

The finished class would look like this

```ruby
class SearchResults < Array
    def limit(x)
        return self[0..(x-1)]
    end

    def order(field, direction)
        case direction
            when :asc
                return sort! { |x, y| x.send(field) <=> y.send(field) }
            when :desc
                return order(field, :asc).reverse!
        else
            raise "Invalid Order Provided, please use :asc or :desc"
        end
    end
end
```

Hardly a huge class is it? This is a little rough around the edges but it serves its purpose and when combined with AR like search methods will be incredibly easy to read and use.
