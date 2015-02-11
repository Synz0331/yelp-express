var doctors = require('./data/doctors.json')
var restaurants = require('./data/restaurants.json')
var users = require('./data/users.json')
var tips = require('./data/tips.json')
var _ = require('lodash'); //Prevents lodash errors

var _ = require('lodash')

module.exports = function(app) {

<<<<<<< HEAD
    app.get('/search', function(req, res) {
        res.render('search')
    })

    app.get('/search/restaurants/name/has/:keyword', function(req, res) {
        var keyword = req.params.keyword


        // TODO: lookup restaurants whose names contain the given keyword
        //var rs = [restaurants[6], restaurants[10]] // hardcoded for 'Pizza'
        function keyWordFilter(element) 
        {
            if (~element.name.indexOf(keyword))
            {
                return element
            }
        }
        var rs = restaurants.filter(keyWordFilter)
        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/good/for/:x', function(req, res) {
        var x = req.params.x

        // TODO: lookup restaurants good for  :x
        //var rs = [restaurants[1], restaurants[2], restaurants[3]] // hardcoded fake results
        function keyWordFilter(element)
        {
            if (element['attributes'])
            {
                if (element['attributes']['Good For'])
                {
                    if (element['attributes']['Good For'][x] === true)
                    {
                        return element
                    }
                        
                }
            }
        }
        var rs = restaurants.filter(keyWordFilter)
        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/ambience/is/:x', function(req, res) {
        var x = req.params.x

        // TODO: lookup restaurants has ambience of :x
        //var rs = [restaurants[1], restaurants[2], restaurants[3]] // hardcoded fake results
        function keyWordFilter(element)
        {
            if (element['attributes'])
            {
                if (element['attributes']['Ambience'])
                {
                    if (element['attributes']['Ambience'][x] === true)
                    {
                        return element
                    }
                        
                }
            }
        }
        var rs = restaurants.filter(keyWordFilter)

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    

    app.get('/search/restaurants/category/is/:x', function(req, res) {
        var x = req.params.x
        x = x.replace(/-/g, ' ')
        // TODO: lookup restaurants belonging to category :x
        //var rs = [restaurants[1], restaurants[2], restaurants[3]] // hardcoded fake results
        function keyWordFilter(element)
        {
            if (element['categories'])
            {
                for( var i = 0; i < element['categories'].length; i++)
                {
                    if (element['categories'][i] == x)
                        return element
                }
            }
        }
        var rs = restaurants.filter(keyWordFilter)

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    


    app.get('/search/restaurants/stars/:relationship/:number', function(req, res) {
        var number = req.params.number
        var relationship = req.params.relationship
        // TODO: lookup restaurants with starts higher or lower than :number
        //var rs = [restaurants[1], restaurants[2], restaurants[3]] // hardcoded fake results
        function keyWordFilter(element)
        {
            if (element['stars'])
            {
                if (relationship == 'below')
                {
                    if (element['stars'] <= number)
                    {
                        return element
                    }
                }
                else
                {
                    if (element['stars'] >= number)
                    {
                        return element
                    }
                }
            }
        }
        var rs = restaurants.filter(keyWordFilter)
        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/q', function(req, res) {
                
        var name = req.query.name
        var minStars = req.query.minStars
        var category = req.query.category
        var ambience = req.query.ambience    
        
        //console.log('req.query: ', req.query)    
        
        // // TODO: lookup restaurants with the given query parameters
        //var rs = [restaurants[1], restaurants[2], restaurants[3]] // hardcoded fake results
        function keyWordFilter(element)
        {   var catName = true
            var catStars = true
            var catCategories = true
            var catAmbience = true
            if (name)
            {
                if (~element.name.indexOf(name))
                {
                    catName = true
                }
                else
                {
                    catName = false
                }
            }
            if (minStars)
            {
                if (element.stars < minStars)
                {
                    catStars = false
                }
            }
            if (category)
            {
                for (var i = 0; i < element.categories.length; i++)
                {
                    if (element.categories[i] == category)
                    {
                        catCategories = true
                        break
                    }
                    else
                    {
                        catCategories = false
                    }
                }
            }
            if(ambience)
            {
                if (element['attributes'])
                {
                    if (element['attributes']['Ambience'])
                    {
                        if (element['attributes']['Ambience'][ambience] === false)
                        {
                            catAmbience = false
                        }
                            
                    }
                }
            }
            if (catName && catStars && catCategories && catAmbience)
            {
                return element
            }
        }
        var rs = restaurants.filter(keyWordFilter)


        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    
=======
	app.get('/search', function(req, res) {
		res.render('search')
	})

	app.get('/search/restaurants/name/has/:keyword', function(req, res) {
		var keyword = req.params.keyword

		var rs = _.filter(restaurants, function(item){
			return _.contains(item.name,keyword);
		})

		res.render('listRestaurants.jade', {
			restaurants: rs
		})
	})

	app.get('/search/restaurants/good/for/:x', function(req, res) {
		var x = req.params.x

		var rs = _.filter(restaurants, function(item){
			if(item.attributes['Good For']){
				return item['attributes']['Good For'][x];
			}
		})

		res.render('listRestaurants.jade', {
			restaurants: rs
		})
	})

	app.get('/search/restaurants/ambience/is/:x', function(req, res) {
		var x = req.params.x

		var rs = _.filter(restaurants, function(item){
			if(item.attributes['Ambience']){
				return item['attributes']['Ambience'][x];
			}
		})

		res.render('listRestaurants.jade', {
			restaurants: rs
		})
	})    

	app.get('/search/restaurants/category/is/:x', function(req, res) {
		var x = req.params.x

		if (x == 'Fast-Food')
		{
			x = 'Fast Food'; //It's formatted this way in restaurants.json
		}

		var rs = _.filter(restaurants, function(item){
			if (_.contains(item.categories, x))
			{
				return true;
			}
		})

		res.render('listRestaurants.jade', {
			restaurants: rs
		})
	})    


	app.get('/search/restaurants/stars/:relationship/:number', function(req, res) {
		var number = req.params.number
		var relationship = req.params.relationship
		var rs;

		if(relationship == "above")
		{
			var rs = _.filter(restaurants, function(item){
				if(item.stars >= number)
				{
					return true;
				}
			})
		}
		else if(relationship == "below")
		{
			var rs = _.filter(restaurants, function(item){
				if(item.stars <= number)
				{
					return true;
				}
			})
		}

		res.render('listRestaurants.jade', {
			restaurants: rs
		})
	})

	app.get('/search/restaurants/q', function(req, res) {

		var name = req.query.name
		var minStars = req.query.minStars
		var category = req.query.category
		var ambience = req.query.ambience   
		var rs;

		console.log('req.query: ', req.query)

		//Multiple unrelated if statements b/c we want to support compound queries
		if (name)
		{
			var rs = _.filter(restaurants, function(item){
				if (_.contains(item.name,name))
				{
					return true;
				}
			})
		}

		if (minStars)
		{
			var rs = _.filter(restaurants, function(item){
				if(item.stars >= minStars)
				{
					return true;
				}
			})
		}

		if(category)
		{
			var rs = _.filter(restaurants,function(item){
				if(_.contains(item.categories, category))
				{
					return true;
				} 
			})
		}

		if(ambience)
		{
			var rs = _.filter(restaurants, function(item){
				if(item.attributes['Ambience'])
				{
					return item.attributes.Ambience[ambience];
				}
			})
		}

		res.render('listRestaurants.jade', {
			restaurants: rs
		})
	})    
>>>>>>> ceaa5dd752188ba678514517c326ec16729ce926

}