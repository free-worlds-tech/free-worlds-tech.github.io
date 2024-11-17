function getSavedLists() {
    let rv = {nextId: 1, lists: []};
    const savedListsValue = localStorage.getItem("saved-lists");
    if (savedListsValue) {
        rv = JSON.parse(savedListsValue);
    }
    return rv;
}

function saveList(listData) {
    let savedLists = getSavedLists();
    let listId = `list-${savedLists.nextId++}`;

    localStorage.setItem(listId, JSON.stringify(listData));
    savedLists.lists.push(listId);
    localStorage.setItem("saved-lists", JSON.stringify(savedLists));
}

function loadList(listId) {
    const listValue = localStorage.getItem(listId);
    if (listValue) {
        return JSON.parse(listValue);
    }

    return null;
}

function deleteSavedList(listId) {
    
}