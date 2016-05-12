angular.module('ln.services', [])

.factory('ln', function($http, db, task, $cordovaDialogs) {
  
  function sort(array) {
    return array.sort(function (a, b) {
      if (a.title > b.title)
        return 1;
      if (a.title < b.title)
        return -1;
      return 0;
    });
  };
  
  function doListCache(data, lang) {
    var list = [];
    for (var i = 0; i <= data.length - 1 ; i++) {
      var item = {
          _id: "ln_" + task.correctTitle(2, data[i].page),
          title: data[i].title,
          revised: data[i].lastrevisedid
      };
      list.push(item);
    }
    list = sort(list);
    db.setLnList({
      _id: "list_" + lang,
      lang: lang,
      time: Date.now(),
      list: list
    }).then(function(res) {
      console.log(JSON.stringify(res));
    }, function(err) {
      console.log(JSON.stringify(err));
    })
    return list;
  };

  return {
    chapter: function(url) {
      return $http.get("https://api.azsiaz.tech/chapter/" + url).then(function(res) {
        return res.data;
      })
    },
    list: function(removeCache, lang) {
      if (removeCache) {
        return db.delDoc("list_" + lang).then(function(doc) {
          return $http.get("https://api.azsiaz.tech/ln/" + lang).then(function(res) {
            var list = doListCache(res.data.titles, lang);
            return list;
          })
        }, function(err) {
          return $http.get("https://api.azsiaz.tech/ln/" + lang).then(function(res) {
            var list = doListCache(res.data.titles, lang);
            return list;
          })
        });
      }
      else {
        return db.getLnList(lang).then(function(res) {
          return res.list;
        }, function(err) {
          return $http.get("https://api.azsiaz.tech/ln/" + lang).then(function(res) {
            var list = doListCache(res.data.titles, lang);
            return list;
          })
        });
      }
    },
    favList: function() {
        return db.all("fav_").then(function(res) {
          return res;
        })
    },
    getChapter: function (id) {
      
    },
    getNovelDetail: function(item, type) {
      item = item.replace(/ /g, "_");
      if (type == 1) {
        return db.get("cache_" + item).then(function(res) {
          return res;
        }, function(err) {
          return $http.get("https://api.azsiaz.tech/title/query/?title=" + encodeURI(item)).then(function(res) {
            var item2 = task.makeNovelDetail(res.data, item);
            db.set(item2).then(function(res) {
              console.log(JSON.stringify(res));
            }, function(err) {
              $cordovaDialogs.alert(JSON.stringify(err));
            });
            return item2;
          })
        });
      }
      else {
        return db.delDoc("cache_" + item).then(function(res) {
          return $http.get("https://api.azsiaz.tech/title/query/?title=" + encodeURI(item)).then(function(res) {
            var item2 = task.makeNovelDetail(res.data, item);
            db.set(item2).then(function(res) {
              console.log(JSON.stringify(res));
            }, function(err) {
              $cordovaDialogs.alert(JSON.stringify(err));
            });
            return item2;
          });
        });
      }
    },
    createFav: function(item) {
      return db.get("fav_" + item).then(function(res) {
        return false;
      }, function(err) {
        return $http.get("https://api.azsiaz.tech/title/query/?title=" + item).then(function(res) {
          return task.getBlob(res.data.cover).then(function(blob) {
            var item2 = {
              _id: "fav_" + item,
              cover: res.data.cover,
              _attachments: {
                cover: {
                  content_type: "text/plain",
                  data: blob
                }
              }
            };
            db.set(item2).then(function(res) {
            }, function(err) {
              $cordovaDialogs.alert(JSON.stringify(err), "DB error");
            });
            return item2;
          })
        })
      });
    },
    deleteFav: function(item) {
      return db.delDoc("fav_" + item);
    },
    formattedFav: function(id) {
      return db.getWithAttach(id);
    }
  };
})

.factory('task', function($q) {
  
  function stripEmpty(item) {
    var item2 = [];
    for (var i = 0; i <= item.length - 1; i++) {
      var item3 = {
        title: item[i].title,
        cover: item[i].cover,
        chapters: []
      };
      for (var i2 = 0; i2 <= item[i].chapters.length - 1; i2++) {
        if(item[i].chapters[i2].title.replace(/ /g, "") == "" || item[i].chapters[i2].title.toLowerCase() == "enlarge" || item[i].chapters[i2].title.toLowerCase() == "full text" || item[i].chapters[i2].title.toLowerCase() == "(full text)" || item[i].chapters[i2].title.toLowerCase().indexOf("all links" ,0) >= 0 || item[i].chapters[i2].title.toLowerCase() == "full mtl" || item[i].chapters[i2].title.toLowerCase() == "e-book versions" || item[i].chapters[i2].title.toLowerCase() == "also read it on hellping" || item[i].chapters[i2].title.toLowerCase() == "also on nd" || item[i].chapters[i2].title.toLowerCase() == "also on kyakka" || item[i].chapters[i2].title.toLowerCase().indexOf("user:" ,0) >= 0 || item[i].chapters[i2].title.toLowerCase().indexOf("on nanodesu" ,0) >= 0 || item[i].chapters[i2].title.toLowerCase().indexOf("on terminus" ,0) >= 0) {
          continue;
        }
        item3.chapters.push({
          title: item[i].chapters[i2].title,
          page: item[i].chapters[i2].page,
          linktype: item[i].chapters[i2].linktype,
          link: item[i].chapters[i2].link
        });
      }
      item2.push(item3);
    }
    return item2;
  };
  
  return {
    getBlob: function(item) {
      return $q.when(blobUtil.imgSrcToBlob(item));
    },
    getArrayBlob: function(array) {
      
    },
    correctTitle: function(type, title) {
      var title2 = title;
      switch (title.toLowerCase()) {
        case "fate/zero":
        case "fatezero":
          if (type == 1) {
            title = "Fate/Zero";
          }
          else {
            title = "fatezero";
          }
          break;
        case "kore wa zombie desu ka":
          if (type == 1) {
            title = "Kore wa Zombie desu ka?"
          }
          else {
            title = "Kore wa Zombie desu ka?";
          }
          break;
        case "rokujouma no shinryakusha!": 
          if (type == 1) {
            title = "Rokujouma no Shinryakusha!?"
          }
          else {
            title = "Rokujouma no Shinryakusha!?";
          }
          break;
        default:
          title = title2;
          break;
      }
      return title;
    },
    stripUrl: function(name, url) {
      if (!url) url = location.href
      name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
      var regexS = "[\\?&]"+name+"=([^&#]*)";
      var regex = new RegExp( regexS );
      var results = regex.exec( url );
      return results == null ? null : results[1];
    },
    makeNovelDetail: function(data, title) {
      var item;
      switch (title) {
        default:
          if (data.one_off == true) {
            item = {
              _id: "cache_" + title,
              updateDate: data.updateDate,
              cover: data.cover,
              synopsis: data.synopsis,
              one_off: data.one_off,
              status: data.status,
              author: data.author,
              illustrator: data.illustrator,
              tome: []
            };
            for (var i = 0; i <= data.sections.length - 1; i++) {
              item.tome.push({
                title: data.sections[i].title,
                tome: data.sections[i].chapters
              });
            }
          }
          else {
            item = {
              _id: "cache_" + title,
              cover: data.cover,
              synopsis: data.synopsis,
              one_off: data.one_off,
              status: "Status : " + data.status,
              author: "Author : " + data.author,
              illustrator: "Illustrator : " + data.illustrator,
              tome: []
            };
            for (var i = 0; i <= data.sections.length - 1; i++) {
              item.tome.push({
                title: data.sections[i].title,
                tome: stripEmpty(data.sections[i].books)
              });
            }
          }
          break;
      }
      return item;
    }
  }
})

.factory('db', function(pouchDB) {
  
  var db = new pouchDB('Ln Reader', {adapter: 'websql'});
  
  function doList(data) {
    var list = [];
    for (var i = 0; i <= data.length - 1 ; i++) {
      var title = data[i].doc._id.split("fav_")[1].replace(/_/g," ")
      var item = {
          _id: "ln_" + title.replace(/ /g,"_"),
          title: title,
          cover: blobUtil.createObjectURL(data[i].doc._attachments.cover.data)
      };
      list.push(item);
      console.log(item);
    }
    return list;
  }

  return {
    all: function(key) {
      return db.allDocs({live: true, include_docs: true,startkey: key,endkey: key + '\uffff', attachments: true, binary: true}).then(function(res) {
        // var list = doList(res.rows);
        // return list;
        return doList(res.rows);
      })
    },
    set: function(item) {
      return db.put(item).then(function(res) {
        return res;
      })
    },
    get: function(item) {
      return db.get(item).then(function(res) {
        return res;
      })
    },
    getLnList: function(lang) {
      var lang2 = "list_" + lang;
      return db.get(lang2).then(function (result) {
        return result;
      });
    },
    setLnList: function(item) {
      return db.put(item).then(function(res) {
        return res;
      });
    },
    removeCache: function(item) {
      return db.allDocs({
        include_docs: true,
        attachments: true,
        startkey: 'cache_',
        endkey: 'cache_\uffff'
      }).then(function (result) {
        return result.rows.length;
        // console.log(JSON.stringify(result));
        // alert(JSON.stringify(result));
      }, function (err) {
        // console.log(JSON.stringify(err));
        // alert(JSON.stringify(err));
      });
    },
    delDoc: function(id) {
      return db.get(id).then(function(doc) {
        return db.remove(doc);
      })
    },
    getAttach: function(item) {
      return db.getAttachment(item[0], item[1]);
    },
    getWithAttach: function(item) {
      return db.get(item, {attachments:true, binary:true}).then(function(res) {
        var title = res._id.split("fav_")[1].replace(/_/g," ");
        return {
          _id: "ln_" + title.replace(/ /g,"_"),
          title: title,
          cover: blobUtil.createObjectURL(res._attachments.cover.data)
        };
      })
    }
  };
});