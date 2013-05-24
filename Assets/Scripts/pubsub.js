guts.pubsub = (function(){

    var doc = document,
        topics = {},
        pubsub = {},
        id = -1;

    /*
        Subscribe to a specific topic and specify a callback function 
        to be executed when the topic triggers an event

        @param  topics  {String}    the name of the topic to add the subscriber to
        @param  fn      {Function}  the function to be called when an event for this topic is triggered
        @return token   {String}    the unique id to be associated with the subscriber
     */
    pubsub.subscribe =  function (topic, fn) {
        /*
           If the specified topic doesn't exist on the object 
           then add it as a new property and set it to an empty Array
         */
        if (!topics[topic]) {
            topics[topic] = [];
        }

        // Create a unique id to be associated with the subscriber
        var token = (++id).toString();

        // Store the token and the subscriber (function) in this topic
        topics[topic].push({
            token: token,
            fn: fn
        });

        // Return the unique id for this subscriber
        return token;
    };

    /*
        Unsubscribe the specified subscriber (specified by the unique token associated to a subscriber)

        @param  token {String}  the unique id for the subscriber
        @Return false {Boolean} nothing else to happen so just return false
     */
    pubsub.unsubscribe =  function (token) {
        // Loop through all topics...
        for (var m in topics) {
            // For each topic...
            if (topics[m]) {
                // Loop through each subscriber...
                for (var i = 0, j = topics[m].length; i < j; i++) {
                    // If the current subscriber's token matches the token passed to the function...
                    if (topics[m][i].token === token) {
                        // Then remove it...
                        topics[m].splice(i, 1);

                        // And return the subscriber's unique id as a reference
                        return token;
                    }
                }
            }
        }

        return false;
    };

    /*
        Publish an event for the specified topic, which will trigger all associated subscriber functions to execute

        @param  topic   {String}    the topic name
        @param  data    {Multiple}  data is passed through to the subscriber function to process (data type can be anything, String/Array/Object whatever!)
        @Return true    {Boolean}   return true so we know the function was executed successfully
     */
    pubsub.publish =  function (topic, data) {
        // If the topic specified cannot be found then return the function early (no point continuing)
        if (!topics[topic]) {
            return false;
        }

        // Asynchronously execute each subscriber function
        setTimeout(function(){
            // Cache the topic
            var subscribers = topics[topic],

            // Cache the length of subscribers for the topic 
            // Note: If the topic has no subscribers then the length will be equal to zero and the following loop will not run
            len = topics[topic].length;

            // Loop through each subscriber...
            while (len--) {
                // And execute the subscriber's associated function
                subscribers[len].fn(topic, data);
            }
        }, 0);

        return true;
    };

    return pubsub;

}());