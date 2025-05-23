PGDMP  
                    }            campusconnect    17.2    17.2     7           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            8           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            9           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            :           1262    16465    campusconnect    DATABASE     �   CREATE DATABASE campusconnect WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE campusconnect;
                     postgres    false                        2615    24729    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                     postgres    false            ;           0    0    SCHEMA public    COMMENT         COMMENT ON SCHEMA public IS '';
                        postgres    false    5            <           0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                        postgres    false    5            �            1259    24751    Post    TABLE     �   CREATE TABLE public."Post" (
    id text NOT NULL,
    content text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "authorId" text NOT NULL
);
    DROP TABLE public."Post";
       public         heap r       postgres    false    5            �            1259    24853    Resource    TABLE       CREATE TABLE public."Resource" (
    id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "fileUrl" text NOT NULL,
    category text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" text NOT NULL
);
    DROP TABLE public."Resource";
       public         heap r       postgres    false    5            �            1259    24744    User    TABLE     �   CREATE TABLE public."User" (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    college text NOT NULL
);
    DROP TABLE public."User";
       public         heap r       postgres    false    5            �            1259    24730    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap r       postgres    false    5            3          0    24751    Post 
   TABLE DATA           S   COPY public."Post" (id, content, "createdAt", "updatedAt", "authorId") FROM stdin;
    public               postgres    false    219   �       4          0    24853    Resource 
   TABLE DATA           h   COPY public."Resource" (id, title, description, "fileUrl", category, "createdAt", "userId") FROM stdin;
    public               postgres    false    220   �       2          0    24744    User 
   TABLE DATA           D   COPY public."User" (id, name, email, password, college) FROM stdin;
    public               postgres    false    218   �       1          0    24730    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public               postgres    false    217          �           2606    24758    Post Post_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Post" DROP CONSTRAINT "Post_pkey";
       public                 postgres    false    219            �           2606    24860    Resource Resource_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Resource"
    ADD CONSTRAINT "Resource_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Resource" DROP CONSTRAINT "Resource_pkey";
       public                 postgres    false    220            �           2606    24750    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public                 postgres    false    218            �           2606    24738 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public                 postgres    false    217            �           1259    24759    User_email_key    INDEX     K   CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);
 $   DROP INDEX public."User_email_key";
       public                 postgres    false    218            �           2606    24760    Post Post_authorId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public."Post" DROP CONSTRAINT "Post_authorId_fkey";
       public               postgres    false    219    4761    218            �           2606    24861    Resource Resource_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Resource"
    ADD CONSTRAINT "Resource_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public."Resource" DROP CONSTRAINT "Resource_userId_fkey";
       public               postgres    false    218    220    4761            3      x������ � �      4      x������ � �      2      x������ � �      1   �   x�}�KjAD�3��>�)��V�"'0�VV	�s������6�U�)� A\s��*�F`!J��io<Z��u2b�N>r�1�U�(���0X�^B��qcl��D*���mo�?@����S���y��N�>ޗ������e#y@h�H�8rP�D
��B�(F����M�9aVĖ�z%s����b^�%�Vq�II�W*.OCt�C�	�,�Y#��\���ui������W�xX��nIe&     