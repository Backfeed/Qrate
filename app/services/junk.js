angular.module('qrate.services.junk', [])
  .service('Junk', Junk);

function Junk($q, _DEV, CurrentUser, Resource) {

  var log = _DEV.log('JUNK SERVICE');

  return {

    getAllTags: getAllTags,
    getTagsByQuery: getTagsByQuery,
    endorseTag: endorseTag,
    DEendorseTag: DEendorseTag,
    getLinksAndTagsByQuery: getLinksAndTagsByQuery,
    getLinksByTag: getLinksByTag,
    addTagsTolink: addTagsTolink,
    evaluateLink: evaluateLink,
    sendLink: sendLink

  };


  function getAllTags() {

    var deferred = $q.defer();


    deferred.resolve( 
      [
        {
          name: 'fizz',
          linksCount: 5
        },
  
        {
          name: 'buzz',
          linksCount: 2
        },
  
        {
          name: 'pikachu',
          linksCount: 999
        }
      ]
    );

    return deferred.promise;

  }

  function getTagsByQuery(query, tagsNamesToExclude) {
    var deferred = $q.defer();

    if (query === 'foo') {
      log('getTagsByQuery: foo detected! resolving with empty list')
      deferred.resolve([]) // mock the scenario where no tags match the search query so te use rhas an option to add it
      return deferred.promise;
    }

    deferred.resolve( 
      [
        {
          name: 'fizz',
          linksCount: 5
        },
  
        {
          name: 'buzz',
          linksCount: 2
        },
  
        {
          name: 'pikachu',
          linksCount: 999
        }
      ]
    );

    return deferred.promise;
  }

  function endorseTag(linkId, tagId) {
    return Resource.post("evaluations?fields=senderTokenReputationChange,contributionNewValue", {
      creator: CurrentUser.get().id,
      tagId: tagId,
      linkId: linkId,
      evaluation: 0
    });
  }

  function DEendorseTag(linkId, tagId) {
    return Resource.post("evaluations?fields=senderTokenReputationChange,contributionNewValue", {
      creator: CurrentUser.get().id,
      tagId: tagId,
      linkId: linkId,
      evaluation: -1
    });
  }

  function getLinksAndTagsByQuery(query) {
    var deferred = $q.defer();
    
    deferred.resolve({
      links: [
        {
          url: "duckduckgo.com",
          tags: [
            {
              name: 'foo',
              endorsmentCount: 5,
              contributionId: 100
            },
            {
              name: 'bar',
              endorsmentCount: 2,
              contributionId: 101
            },
            {
              name: 'fizz',
              endorsmentCount: 13,
              contributionId: 102
            }
          ]
        },
        {
          url: "fifa.com",
          currentUserEvaluation: 3,
          tags: [
            {
              name: 'sport',
              endorsmentCount: 2,
              contributionId: 103
            },
            {
              name: 'corruption',
              endorsmentCount: 6,
              contributionId: 104
            },
            {
              name: 'waste-of-time',
              endorsmentCount: 99,
              contributionId: 105
            }
          ]
        }
      ],

      tags: [
        {
          name: 'fizz',
          linksCount: 5
        },
  
        {
          name: 'buzz',
          linksCount: 2
        },
  
        {
          name: 'pikachu',
          linksCount: 999
        }
      ]

    });

    return deferred.promise;
  }

  function getLinksByTag() {

  }

  function addTagsTolink() {

  }

  function evaluateLink(linkId, linkEvaluation) {
    return Resource.post({
      creator: CurrentUser.get().id,
      contributionId: linkId,
      evaluation: linkEvaluation
    });
  }

  function sendLink(data) {
    var deferred = $q.defer();

    deferred.resolve(Math.random() > 0.5) // simulate random response if link exists or not

    return deferred.promise;
  }



}