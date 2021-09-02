class Album:
    def __init__(self, priority, artist, album_name, got_em, price, link):
        self.priority = priority
        self.artist = artist
        self.album_name = album_name
        self.got_em = got_em
        self.price = price
        self.link = link

    def to_tuple(self):
        return (self.priority, self.artist, self.album_name, self.got_em, self.price, self.link)
