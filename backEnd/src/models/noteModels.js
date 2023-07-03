/**
 * constructor databse
 * 
 * 
 *  ------------
 * table user:
 * user_id	integer
created_at	timestamp without time zone
updated_at	timestamp without time zone
user_password	character varying
user_role	character varying
facebook_url	character varying
moreinfo	character varying
avatar_url	character varying
phone	character varying
adress	character varying
zalo_url	character varying
user_name	character varying
user_email	character varying
--------

table payment:
payment_id	integer
user_id	integer
payment_date	date
total_amount	numeric
created_at	timestamp without time zone
updated_at	timestamp without time zone
---------

table courses:
course_id	integer
course_price	numeric
instructor_id	integer
category_id	integer
created_at	timestamp without time zone
updated_at	timestamp without time zone
path_course	character varying
course_name	character varying
course_description	text
avatar_course	character varying
status	character varying
level_course	character varying
---------

table enrollment:
enrollment_id	integer
user_id	integer
course_id	integer
enrollment_date	date
created_at	timestamp without time zone
updated_at	timestamp without time zone
------------

table carts:
cart_id	integer
user_id	integer
created_at	timestamp without time zone
updated_at	timestamp without time zone
------------

table comments:
parent_id	integer
user_id	integer
updated_at	timestamp without time zone
comment_id	integer
lesson_id	integer
created_at	timestamp without time zone
content	text
-----------------

table coursecategories:
category_id	integer
created_at	timestamp without time zone
updated_at	timestamp without time zone
category_name	character varying
---------------

table resultcourse:
result_id	integer
course_id	integer
created_at	timestamp without time zone
updated_at	timestamp without time zone
content	text
----------------

table module:
module_id	integer
course_id	integer
module_name	character varying
----------------------

table cartitems:
cart_item_id	integer
cart_id	integer
course_id	integer
quantity	integer
created_at	timestamp without time zone
updated_at	timestamp without time zone
------------------

table lesson:
lesson_id	integer
module_id	integer
lesson_name	character varying
video_url	character varying
 */
