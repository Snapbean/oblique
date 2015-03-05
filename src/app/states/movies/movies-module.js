(function () {
	'use strict';

	angular
		.module('__MODULE__.movies', ['ui.router'])
		.config(function ($stateProvider) {
			$stateProvider.state('movies', {
				title: 'states.movies.title',
				url: '/movies?query',
				templateUrl: 'movies/movies.tpl.html',
				controller: 'MoviesController'
			});
		});
}());
