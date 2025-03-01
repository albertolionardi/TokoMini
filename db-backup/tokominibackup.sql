PGDMP      !                }            tokomini    16.3    16.3 3    !           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            "           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            #           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            $           1262    16753    tokomini    DATABASE     �   CREATE DATABASE tokomini WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE tokomini;
                postgres    false            �            1259    16760    admins    TABLE     Z  CREATE TABLE public.admins (
    adminid integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    token character varying(255),
    role character varying(50),
    lockedduration timestamp without time zone,
    loginfailcounter integer DEFAULT 0
);
    DROP TABLE public.admins;
       public         heap    postgres    false            �            1259    16759    admins_adminid_seq    SEQUENCE     �   CREATE SEQUENCE public.admins_adminid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.admins_adminid_seq;
       public          postgres    false    216            %           0    0    admins_adminid_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.admins_adminid_seq OWNED BY public.admins.adminid;
          public          postgres    false    215            �            1259    16825 	   cartitems    TABLE     �   CREATE TABLE public.cartitems (
    cartitemid integer NOT NULL,
    cartid integer NOT NULL,
    productid integer NOT NULL,
    qty integer NOT NULL
);
    DROP TABLE public.cartitems;
       public         heap    postgres    false            �            1259    16824    cartitems_cartitemid_seq    SEQUENCE     �   CREATE SEQUENCE public.cartitems_cartitemid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.cartitems_cartitemid_seq;
       public          postgres    false    226            &           0    0    cartitems_cartitemid_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.cartitems_cartitemid_seq OWNED BY public.cartitems.cartitemid;
          public          postgres    false    225            �            1259    16813    carts    TABLE     X   CREATE TABLE public.carts (
    cartid integer NOT NULL,
    userid integer NOT NULL
);
    DROP TABLE public.carts;
       public         heap    postgres    false            �            1259    16812    carts_cartid_seq    SEQUENCE     �   CREATE SEQUENCE public.carts_cartid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.carts_cartid_seq;
       public          postgres    false    224            '           0    0    carts_cartid_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.carts_cartid_seq OWNED BY public.carts.cartid;
          public          postgres    false    223            �            1259    16801    orders    TABLE     �   CREATE TABLE public.orders (
    orderid integer NOT NULL,
    userid integer NOT NULL,
    date date NOT NULL,
    status character varying(32) NOT NULL,
    cartid integer,
    address character varying(255)
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �            1259    16800    orders_orderid_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_orderid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.orders_orderid_seq;
       public          postgres    false    222            (           0    0    orders_orderid_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.orders_orderid_seq OWNED BY public.orders.orderid;
          public          postgres    false    221            �            1259    16771    products    TABLE     7  CREATE TABLE public.products (
    productid integer NOT NULL,
    productname character varying(255) NOT NULL,
    productprice numeric(10,2) NOT NULL,
    productcategory character varying(255) NOT NULL,
    productimg text NOT NULL,
    productstock integer NOT NULL,
    productdescription text NOT NULL
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    16770    products_productid_seq    SEQUENCE     �   CREATE SEQUENCE public.products_productid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.products_productid_seq;
       public          postgres    false    218            )           0    0    products_productid_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.products_productid_seq OWNED BY public.products.productid;
          public          postgres    false    217            �            1259    16790    users    TABLE     X  CREATE TABLE public.users (
    userid integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    token character varying(255),
    role character varying(50),
    lockedduration timestamp without time zone,
    loginfailcounter integer DEFAULT 0
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16789    users_userid_seq    SEQUENCE     �   CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.users_userid_seq;
       public          postgres    false    220            *           0    0    users_userid_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;
          public          postgres    false    219            i           2604    16763    admins adminid    DEFAULT     p   ALTER TABLE ONLY public.admins ALTER COLUMN adminid SET DEFAULT nextval('public.admins_adminid_seq'::regclass);
 =   ALTER TABLE public.admins ALTER COLUMN adminid DROP DEFAULT;
       public          postgres    false    216    215    216            p           2604    16828    cartitems cartitemid    DEFAULT     |   ALTER TABLE ONLY public.cartitems ALTER COLUMN cartitemid SET DEFAULT nextval('public.cartitems_cartitemid_seq'::regclass);
 C   ALTER TABLE public.cartitems ALTER COLUMN cartitemid DROP DEFAULT;
       public          postgres    false    225    226    226            o           2604    16816    carts cartid    DEFAULT     l   ALTER TABLE ONLY public.carts ALTER COLUMN cartid SET DEFAULT nextval('public.carts_cartid_seq'::regclass);
 ;   ALTER TABLE public.carts ALTER COLUMN cartid DROP DEFAULT;
       public          postgres    false    224    223    224            n           2604    16804    orders orderid    DEFAULT     p   ALTER TABLE ONLY public.orders ALTER COLUMN orderid SET DEFAULT nextval('public.orders_orderid_seq'::regclass);
 =   ALTER TABLE public.orders ALTER COLUMN orderid DROP DEFAULT;
       public          postgres    false    222    221    222            k           2604    16774    products productid    DEFAULT     x   ALTER TABLE ONLY public.products ALTER COLUMN productid SET DEFAULT nextval('public.products_productid_seq'::regclass);
 A   ALTER TABLE public.products ALTER COLUMN productid DROP DEFAULT;
       public          postgres    false    218    217    218            l           2604    16793    users userid    DEFAULT     l   ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);
 ;   ALTER TABLE public.users ALTER COLUMN userid DROP DEFAULT;
       public          postgres    false    220    219    220                      0    16760    admins 
   TABLE DATA           o   COPY public.admins (adminid, email, password, name, token, role, lockedduration, loginfailcounter) FROM stdin;
    public          postgres    false    216   @:                 0    16825 	   cartitems 
   TABLE DATA           G   COPY public.cartitems (cartitemid, cartid, productid, qty) FROM stdin;
    public          postgres    false    226   ;                 0    16813    carts 
   TABLE DATA           /   COPY public.carts (cartid, userid) FROM stdin;
    public          postgres    false    224   4;                 0    16801    orders 
   TABLE DATA           P   COPY public.orders (orderid, userid, date, status, cartid, address) FROM stdin;
    public          postgres    false    222   ];                 0    16771    products 
   TABLE DATA           �   COPY public.products (productid, productname, productprice, productcategory, productimg, productstock, productdescription) FROM stdin;
    public          postgres    false    218   �;                 0    16790    users 
   TABLE DATA           m   COPY public.users (userid, name, email, password, token, role, lockedduration, loginfailcounter) FROM stdin;
    public          postgres    false    220   k=       +           0    0    admins_adminid_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.admins_adminid_seq', 1, true);
          public          postgres    false    215            ,           0    0    cartitems_cartitemid_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.cartitems_cartitemid_seq', 4, true);
          public          postgres    false    225            -           0    0    carts_cartid_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.carts_cartid_seq', 3, true);
          public          postgres    false    223            .           0    0    orders_orderid_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.orders_orderid_seq', 29, true);
          public          postgres    false    221            /           0    0    products_productid_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.products_productid_seq', 15, true);
          public          postgres    false    217            0           0    0    users_userid_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.users_userid_seq', 3, true);
          public          postgres    false    219            r           2606    16769    admins admins_email_key 
   CONSTRAINT     S   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key UNIQUE (email);
 A   ALTER TABLE ONLY public.admins DROP CONSTRAINT admins_email_key;
       public            postgres    false    216            t           2606    16767    admins admins_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (adminid);
 <   ALTER TABLE ONLY public.admins DROP CONSTRAINT admins_pkey;
       public            postgres    false    216            �           2606    16830    cartitems cartitems_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.cartitems
    ADD CONSTRAINT cartitems_pkey PRIMARY KEY (cartitemid);
 B   ALTER TABLE ONLY public.cartitems DROP CONSTRAINT cartitems_pkey;
       public            postgres    false    226            ~           2606    16818    carts carts_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (cartid);
 :   ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
       public            postgres    false    224            |           2606    16806    orders orders_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (orderid);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    222            v           2606    16778    products products_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (productid);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    218            x           2606    16799    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    220            z           2606    16797    users users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    220            �           2606    16831    cartitems cartitems_cartid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cartitems
    ADD CONSTRAINT cartitems_cartid_fkey FOREIGN KEY (cartid) REFERENCES public.carts(cartid) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.cartitems DROP CONSTRAINT cartitems_cartid_fkey;
       public          postgres    false    4734    226    224            �           2606    16819    carts carts_userid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid) ON DELETE CASCADE;
 A   ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_userid_fkey;
       public          postgres    false    4730    220    224            �           2606    16807    orders orders_userid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid) ON DELETE CASCADE;
 C   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_userid_fkey;
       public          postgres    false    222    4730    220               �   x�-��N�@E��/��uWZ��
�_��P �|}��ݽ''7�ҊJ`���Bȶ6x/D���_�G����{�>�Xa�.t�/p�i�7�.��-Y���~�v�Z>/�-cv��h��,�?}l�jl���G�}�W�ט�[��4:�fd�fb>�-U��+�y��as|PI���A�@���L3���u�
bIZ            x������ � �            x�3�4�2�4�2�4����� A         �   x��л�0�Z�B8 O�	�z��1�4��]\J �\K<���Nyl��q��{\�q�C
� �`6�6q6�0�0�0�0����f�G�AJ�i��E�Fk\aP�Ѳ�6uA�3*?��TT��	�|x���Q         c  x����N� ��O������v��3.K��)�8VJս�@76�F.�I��~~~ �U50� Mp<��=gI��5?�$�[W�6̗��e�� O��j9�n��EQ�Bi-^$G�0})&n~�V\p�a8T��	�Rm_w�<@sHI�;���w�6�#	��U�Z�
�]@��-�u���G2���a�2� �:�Jr����|�F���g��^�s�q�o!u䃤����,���v(9.�mJ�T�m}�zd&>���Ѷ�z���ob���h�U�^���������n}W�$�>����j0V���m�����`�_���{�k�䇱d��ā�R�����w�1B����V         �  x���I��P���;j�� v� ���+�AIm�~2�(�~}QvbL�՛��s��;9ܬkp]�9�]���{ǃ����[>{c�7�~�3�Ħ�Z���r|{+�h���+�����~����Z�T;[(�;;ã�0A�l#(L>T� ���(�DMKL�:��t�ӂ~6���CI���F��m0\"�@j:�=�[y�Ys�DKC�zdie��v�=2�Fu�_1#^�@�^�$Y��L�l�@�>�=g�����I���u���n�֥q�;r�n�;ޞ`�i�ً�^)[yq�$:�
�����$�c����x�iX8�;�dB,ϧ��5��I�,��@+$H�ȤѰ���T,��~���G��+qY�4�l��V���§:�B�>C����"�{���y+@��9���G�ԶO�i/�;m�m`Tȑ�/���$?������l��hj��`��=�����0��Ơݵ��UH�Қ\Q|k�Kux������_#@�B     