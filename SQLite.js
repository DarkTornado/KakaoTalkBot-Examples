/*
SQLite module
© 2023 Dark Tornado, All rights reserved.
CCL BY-NC 4.0
*/

(function() {
    const SQLiteDatabase = android.database.sqlite.SQLiteDatabase;

    function SQLite() {
        this.db = null;
    }
    SQLite.prototype = {};
    SQLite.prototype.open = function(file) {
        this.db = SQLiteDatabase.openDatabase(file, null, SQLiteDatabase.CREATE_IF_NECESSARY);
    };
    SQLite.prototype.query = function(sql) {
        if (sql.trim().toLowerCase().startsWith('select')) {
            return this.db.rawQuery(sql, null);
        } else {
            this.db.execSQL(sql);
        }
    };
    SQLite.prototype.close = function() {
        this.db.close();
    };

    module.exports = SQLite;
})();

