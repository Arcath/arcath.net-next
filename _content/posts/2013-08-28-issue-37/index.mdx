---
title: Issue 37
date: 2013-08-28T09:19:00+01:00
lead: Issue 37 was a weird issue to fix
tags:
 - ADAuth
 - Ruby
---
[Adauth/Issue#37](https://github.com/Arcath/Adauth/issues/37) was raised by [weightyfoe](https://github.com/weightyfoe) and has proven to be a rather weird one.

Basically Adauth would successfuly authenticate a user when no password was supplied which to me sounds like AD allowing some kind anonymous login to query data that everyone has access to. The problem is that Adauth uses did it bind correctly? as the true/false value for the user details being correct.

## What kind of access do we get using passwordless?

One thing that came to mind straight away was what level of access do we get using the passwordless login? So I fired up irb and ran this:

```rb
>> Adauth.configure do |c|
*> c.domain = "domain.local"
*> c.query_user = "Administrator"
*> c.query_password = ""
*> end
>> Adauth::AdObjects::User.all
[#<Adauth::AdObjects::User:0...>]
```

Weirdly doing this test 5 minutes later resulted in an error

```rb
>> Adauth::AdObjects::User.all
RuntimeError: Search returned NIL
```

The intermitance of this issue is going to make fixing it a challenge but lets press on.

## Block blank passwords!

An obvious solution to to make Adauth simply block passwords of 0 length but what if you have users with no passwords? and thats not fixing the underlying issue just masking it.

## Could it be AD?

One thought is that its AD saying no password? no problem! and letting you in… which is midly scary as I’m working on a brand new domain here so it would have to be security hole thats open by default.

## Adauth or Net/Ldap?

I started looking at Net/Ldap as a potential cause (Adauth doesn’t talk to AD directly so its not likely to be the cause) and BINGO [issue #43](https://github.com/ruby-ldap/ruby-net-ldap/issues/43) which is a repost of [issue #5](https://github.com/ruby-ldap/ruby-net-ldap/issues/5) which shows that yes it is ADs fault! Its letting anonymous binding happen so that we can query the [rootDSE](http://msdn.microsoft.com/en-us/library/windows/desktop/ms684291(v=vs.85).aspx). I can’t really see why you would want that but its part of the spec so what can we do?

## The fix

Although it is AD causing the issue its doing it to meet the LDAP specification so it makes it the responsibility of the LDAP client to support the spec and take it into account when writing code to that end the solution is to add a config variable to control anonymous bindings.

```rb
raise "Anonymous Bind is disabled" if @config[:password] == "" && !(@config[:anonymous_bind])
```

This happens in `Adauth::Connection.bind` to halt the authentication process in the same way that Timeouts and Bad Passwords do.

As normal there is now a test to make sure that this never happens again

```rb
default_config
ldap_user = Adauth.authenticate("administrator", "foo")
ldap_user.should be_false
ldap_user = Adauth.authenticate(test_data("domain", "breakable_user"), "")
ldap_user.should be_false
ldap_user = Adauth.authenticate(test_data("domain", "query_user"), test_data("domain", "query_password"))
ldap_user.should be_a Adauth::AdObjects::User
```

Which basically makes sure that logging in with a bad password causes an error, then makes sure that no password errors and just confirms that normal authentication works.

Anonymous bind is going to be disabled by default but can be turned back on using `c.anonymous_bind = true` during your `Adauth.configure` block.
