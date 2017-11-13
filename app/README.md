No error handling in view controller. Use directive to handle API errors that:

1. Shows general api errors in given place in form (e.g. top of the form). This is when something happens and we don’t really know what (server failed)
2. Shows field related error next to the field as I would show standard validation error.
3. Shows some errors in general area that are field related but that field is not found in form.
4. Let's you decide if particular form field should have error attached to that field or should it fall into “general error” area.

And all of that using ng-messages, so no additional custom components needed.