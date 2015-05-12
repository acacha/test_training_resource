/*global angular*/
(function () {
    "use strict";

    var app = angular.module('myApp', ['ng-admin']);

    app.config(function (NgAdminConfigurationProvider) {
        var nga = NgAdminConfigurationProvider;
        // set the main API endpoint for this admin
        var app = nga.application('My backend')
            .baseApiUrl('http://trainingresourceapp.app/api/');

        var training_resource = nga.entity('training_resource').identifier(nga.field('training_resource_id'));
        app.addEntity(training_resource);

        // set the list of fields to map in each post view
        training_resource.dashboardView().fields(/* see example below */);

        training_resource.dashboardView() // customize the dashboard panel for this entity
            .title('Recent training_resource')
            .order(1) // display the post panel first in the dashboard
            .perPage(5) // limit the panel to the 5 latest posts
            .fields([nga.field('training_resource_name').isDetailLink(true)]);

        training_resource.listView()
            .title('All training_resources') // default title is "[Entity_name] list"
            .description('List of training_resources with infinite pagination') // description appears under the title
            .infinitePagination(true) // load pages as the user scrolls
            .fields([
                nga.field('training_resource_id').label('Id'), // The default displayed name is the camelCase field name. label() overrides id
                nga.field('training_resource_name'), // the default list field type is "string", and displays as a string
                nga.field('training_resource_short_name'), // the default list field type is "string", and displays as a string
                nga.field('training_resource_description', 'wysiwyg'),
            ])
            .listActions(['show', 'edit', 'delete']);
        training_resource.creationView().fields(
            [
                nga.field('training_resource_name') // the default edit field type is "string", and displays as a text input
                    .attributes({ placeholder: 'the post title' }) // you can add custom attributes, too
                    .validation({ required: true, minlength: 3, maxlength: 100 }), // add validation rules for fields
                nga.field('training_resource_short_name'),
                nga.field('training_resource_description', 'wysiwyg'), // overriding the type allows rich text editing for the body
                nga.field('training_resource_thumbnail'),
                nga.field('training_resource_external_url'),
                nga.field('training_resource_parentResourceId'),
            ]
        );

        training_resource.editionView()
            .title('Edit training_resource "{{ entry.values.training_resource_name }}"') // title() accepts a template string, which has access to the entry
            .actions(['list', 'show', 'delete']) // choose which buttons appear in the top action bar. Show is disabled by default
            .fields([
                training_resource.creationView().fields(), // fields() without arguments returns the list of fields. That way you can reuse fields from another view to avoid repetition
            ]);

        training_resource.showView() // a showView displays one entry in full page - allows to display more data than in a a list
            .fields([
                nga.field('training_resource_id'),
                training_resource.editionView().fields(), // reuse fields from another view in another order
            ]);


        nga.configure(app);
    });

}());
