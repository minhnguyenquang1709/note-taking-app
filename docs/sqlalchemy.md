# SQLAlchemy Core

- kiến trúc nền tảng của SQLAlchemy, vai trò là database toolkit, cung cấp các tools để quản lý connectivity đến db, tương tác với db queries.

# SQLAlchemy ORM

- được xây dựng trên SQLAlchemy Core, cung cấp một lớp trừu tượng cao hơn để làm việc với db thông qua các đối tượng Python thay vì viết trực tiếp SQL queries.

# Tutorial

## Establishing Connectivity - the Engine

- bắt đàu bằng việc tạo 1 object **Engine**, là trung tâm của các connections đến 1 db cụ thể, cung cấp 1 factory và nơi chứa (connection pool) dành cho db connections. chỉ tạo 1 object/db server, được cấu hình (configured) bằng 1 URL string.
- vd: "postgresql+asyncpg://username:password@localhost:5432/"

  - "@..." địa chỉ db

- 'postgresql' là tên của db dialect
- 'asyncpg' là tên của db driver

## Working with Transactions and the DBAPI

- Khi dùng ORM (Object Relational Mapper), Engine sẽ được quản lý bởi Session (cầm Session object là sẽ tương tác được với db).
- Engine kết nối được với db thì cung cấp một Connection object, đại diện cho 1 kết nối đơn lẻ đến db, có thể thực hiện các db operations (như queries, transactions).

### Getting a Connection

- Connection tạo một open resource đối với db, nên ta sẽ muốn giới hạn sử dụng object này vào một context cụ thể bằng cách sử dụng Python context manager ('with' statement).
- with engine.connect() as conn:

### Committing changes

- conn.commit() ở cuối context manager để commit các thay đổi (nếu có).

### Executing with an ORM Session

```python
from sqlalchemy.orm import Session

stmt = text("SELECT x, y FROM some_table WHERE y > :y ORDER BY x, y")
with Session(engine) as session:
    result = session.execute(stmt, {"y": 6})
    for row in result:
        print(f"x: {row.x}  y: {row.y}")
```

## Working with Database Metadata

- Trung tâm của cả SQLAlchemy Core và ORM là SQL Expression Language, cho phép tạo các SQL queries. Nền tảng của queries là python objects thể hiện db concepts như là tables, columns, gọi chung các objects này là db metadata.
- có 2 cách để khai báo metadata

### Cách 1: Khai báo Metadata kiểu Core

```python
from sqlalchemy import MetaData, Table, Column, Integer, String

metadata_obj = MetaData()

user_table = Table(
  "user_account",
  metadata_obj,
  Column("id", Integer, primary_key=True),
  Column("name", String(30)),
  Column("fullname", String)
)
```

- Thường thì ta dùng 1 MetaData object cho toàn bộ application, nó được chia sẻ giữa các Table objects khai báo theo cả 2 cách ORM và Core.

- Sau đó chạy lệnh 'metadata_obj.create_all(engine)' để tạo các bảng trong db. Thực tế, nó gửi các câu lệnh DDL (Data Definition Language) đến db để tạo các bảng.

```sql
BEGIN (implicit)
PRAGMA main.table_...info("user_account")
...
PRAGMA main.table_...info("address")
...
CREATE TABLE user_account (
    id INTEGER NOT NULL,
    name VARCHAR(30),
    fullname VARCHAR,
    PRIMARY KEY (id)
)
...
CREATE TABLE address (
    id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    email_address VARCHAR NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY(user_id) REFERENCES user_account (id)
)
...
COMMIT
```

### Cách 2: Khai báo Metadata kiểu ORM

- khai báo bảng thường gộp với khai báo class mapping, tức là khai báo cả class tương ứng trong Python. theo hướng này dev dễ dàng khai báo cả các kiểu dữ liệu tự định nghĩa.

#### Establising a Declarative Base

- Khi sử dụng ORM, MetaData collection hiện hữu nhưng nó được liên kết với một cấu trúc chỉ dành cho ORM là Declarative Base.

```python
from sqlalchemy.orm import DeclarativeBase
class Base(DeclarativeBase):
    pass
```

#### Declaring Mapped Classes

- Từ Base class, ta có thể định nghĩa các ORM mapped classes bằng cách kế thừa từ Base. thường (nhưng ko phải luôn luôn) mỗi class liên kết với một bảng trong db.

```python
from typing import List
from typing import Optional
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "user_account"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30))
    fullname: Mapped[Optional[str]]
    addresses: Mapped[List["Address"]] = relationship(back_populates="user")
    def __repr__(self) -> str:
        return f"User(id={self.id!r}, name={self.name!r}, fullname={self.fullname!r})"

class Address(Base):
    __tablename__ = "address"
    id: Mapped[int] = mapped_column(primary_key=True)
    email_address: Mapped[str]
    user_id = mapped_column(ForeignKey("user_account.id"))
    user: Mapped[User] = relationship(back_populates="addresses")
    def __repr__(self) -> str:
        return f"Address(id={self.id!r}, email_address={self.email_address!r})"
```

#### Emitting DDL to the Database

- Cuối cùng lại gọi 'Base.metadata.create_all(engine)' để tạo các bảng trong db.

### Table Reflection

- SQLAlchemy có thể tự động tải cấu trúc bảng từ db hiện có, quá trình này gọi là reflection.

```python
some_table = Table("some_table", metadata_obj, autoload_with=engine)
```

---

# Glossary

## dialect

- là 1 python object biểu diễn thông tin và methods cho phép db operation được thực hiện trên 1 db backend cụ thể và driver tương ứng.

## driver

- là 1 thư viện python cung cấp khả năng giao tiếp giữa SQLAlchemy và db cụ thể.

## DDL (Data Definition Language)

- là 1 tập hợp các câu lệnh SQL dùng để định nghĩa và quản lý cấu trúc của db, bao gồm các câu lệnh như CREATE, ALTER, DROP để tạo, sửa đổi và xóa các bảng và các đối tượng db khác.
