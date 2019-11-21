---
sitemap: false
layout:
---

// Based on a script by Kathie Decora: https://katydecorah.com/code/lunr-and-jekyll

// Create the lunr index for the search
let index = elasticlunr(function () {
  this.setRef('id')
  this.addField('title')
  this.addField('category')
  this.addField('content', { boost: 10 })
  this.addField('author')
  this.addField('layout')
  this.addField('tags')
});

// Add to this index the proper metadata from the Jekyll content
{% assign count = 0 %}
{% for post in site.posts %}
  index.addDoc({
    id:       {{ count }},
    title:    {{ post.title | jsonify }},
    category: {{ post.categories[0] | jsonify }},
    content:  {{ post.content | jsonify | strip_html }},
    author:   {{ post.author | jsonify }},
    layout:   {{ post.layout | jsonify }},
    tags:     {{ post.tags | jsonify }},
  });

  {% assign count = count | plus: 1 %}
{% endfor %}

// Builds reference data (maybe not necessary for us, to check)
let store = [
  {% for post in site.posts %}
    {
      "title":    {{ post.title | jsonify }},
      "category": {{ post.categories[0] | jsonify }},
      "link":     {{ post.url | jsonify }},
      "image":    {{ post.featured_image | jsonify }},
      "date":     {{ post.date | date: '%Y.%m.%d' | jsonify }},
      "author":   {{ post.author | jsonify }},
      "layout":   {{ post.layout | jsonify }},
      "excerpt":  {{ post.content | strip_html | truncatewords: 20 | jsonify }}
    }{% unless forloop.last %},{% endunless %}
  {% endfor %}
];

// Query
let qd = {}; // Gets values from the URL
location.search.substr(1).split("&").forEach(function(item) {
  let s = item.split("="),
      k = s[0],
      v = s[1] && decodeURIComponent(s[1]);
    (k in qd) ? qd[k].push(v) : qd[k] = [v]
});

function doSearch() {
  let resultdiv = $('#results');
  let query = $('input#search').val();

  // The search is then launched on the index built with Lunr
  let result = index.search(query, {});
  resultdiv.empty();

  if (result.length == 0) {
    resultdiv.append('<p class="">Ничего не найдено</p>');
  } else if (result.length == 1) {
    resultdiv.append('<p class="">Найден '+result.length+' резульат</p>');
  } else {
    resultdiv.append('<p class="">Результатов: '+result.length+'</p>');
  }

  // Loop through, match, and add results
  for (let item in result) {
    let ref = result[item].ref;
    let searchitem = '<div class="result">' +
                       '<p>' +
                         '<a href="{{ site.baseurl }}' + store[ref].link + '?q=' + query + '">' +
                           store[ref].title +
                         '</a>' +
                       '</p>' +
                      '</div>';
    resultdiv.append(searchitem);
  }
}

$(document).ready(function() {
  if (qd.q) {
    $('input#search').val(qd.q[0]);
    doSearch();
  }

  $('input#search').on('keyup', doSearch);
});
