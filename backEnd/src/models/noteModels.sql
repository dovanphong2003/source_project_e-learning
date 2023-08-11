/*
CREATE TABLE public.coursecategories (
	category_id serial4 NOT NULL,
	category_name varchar(255) NOT NULL,
	created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	image_category varchar(255) NULL,
	CONSTRAINT coursecategories_pkey PRIMARY KEY (category_id)
);


CREATE TABLE public.users (
	user_id serial4 NOT NULL,
	user_name varchar(255) NOT NULL,
	user_email varchar(255) NOT NULL,
	user_password text NOT NULL,
	user_role varchar(50) NOT NULL,
	created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	avatar_url varchar(255) NULL,
	phone varchar(25) NULL,
	adress varchar(255) NULL,
	zalo_url varchar(255) NULL,
	facebook_url varchar(255) NULL,
	moreinfo varchar(255) NULL,
	CONSTRAINT users_pkey PRIMARY KEY (user_id)
);



CREATE TABLE public.courses (
	course_id serial4 NOT NULL,
	course_name varchar(255) NOT NULL,
	course_description text NULL,
	course_price varchar(255) NOT NULL,
	instructor_id int4 NOT NULL,
	category_id int4 NOT NULL,
	created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	status varchar(255) NULL,
	level_course varchar(255) NULL,
	path_course varchar(255) NULL,
	bestseller bool NULL DEFAULT false,
	rating int4 NULL,
	image_course varchar(255) NULL,
	resultcourse varchar(1000) NULL,
	CONSTRAINT courses_pkey PRIMARY KEY (course_id),
	CONSTRAINT courses_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.coursecategories(category_id),
	CONSTRAINT courses_instructor_id_fkey FOREIGN KEY (instructor_id) REFERENCES public.users(user_id)
);



CREATE TABLE public.enrollments (
	enrollment_id serial4 NOT NULL,
	user_id int4 NOT NULL,
	course_id int4 NOT NULL,
	created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	name_course varchar(255) NULL,
	CONSTRAINT enrollments_pkey PRIMARY KEY (enrollment_id),
	CONSTRAINT enrollments_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(course_id),
	CONSTRAINT enrollments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id)
);



CREATE TABLE public.modulelesson (
	module_id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	module_name varchar(255) NULL,
	course_id int4 NOT NULL,
	created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT module_pkey PRIMARY KEY (module_id),
	CONSTRAINT module_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(course_id)
);



CREATE TABLE public.payments (
	payment_id serial4 NOT NULL,
	user_id int4 NOT NULL,
	payment_date date NOT NULL,
	total_amount numeric(10, 2) NOT NULL,
	created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT payments_pkey PRIMARY KEY (payment_id),
	CONSTRAINT payments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id)
);


CREATE TABLE public.rating (
	id_rating serial4 NOT NULL,
	rating int4 NULL,
	id_course serial4 NOT NULL,
	id_user serial4 NOT NULL,
	CONSTRAINT rating_pkey PRIMARY KEY (id_rating),
	CONSTRAINT rating_id_course_fkey FOREIGN KEY (id_course) REFERENCES public.courses(course_id),
	CONSTRAINT rating_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(user_id)
);


CREATE TABLE public.resultcourse (
	result_id int4 NOT NULL,
	course_id int4 NOT NULL,
	"content" text NOT NULL,
	created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT resultcourse_pkey PRIMARY KEY (result_id),
	CONSTRAINT resultcourse_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(course_id)
);


CREATE TABLE public.cartitems (
	cart_item_id serial4 NOT NULL,
	course_id int4 NOT NULL,
	created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	user_id int4 NOT NULL,
	CONSTRAINT cartitems_pkey PRIMARY KEY (cart_item_id),
	CONSTRAINT cartitems_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(course_id),
	CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(user_id)
);


CREATE TABLE public.lesson (
	lesson_id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	lesson_name varchar(255) NULL,
	video_url varchar(255) NULL,
	module_id int4 NOT NULL,
	created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	type_video varchar(255) NULL,
	avartar_vdeo varchar(255) NULL,
	CONSTRAINT lesson_pkey PRIMARY KEY (lesson_id),
	CONSTRAINT fk_module FOREIGN KEY (module_id) REFERENCES public.modulelesson(module_id)
);


CREATE TABLE public."comments" (
	comment_id serial4 NOT NULL,
	user_id int4 NOT NULL,
	comment_content text NOT NULL,
	parent_id int4 NULL,
	lesson_id int4 NOT NULL,
	created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT comments_pkey PRIMARY KEY (comment_id),
	CONSTRAINT comments_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.lesson(lesson_id),
	CONSTRAINT comments_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public."comments"(comment_id),
	CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id)
);
*/